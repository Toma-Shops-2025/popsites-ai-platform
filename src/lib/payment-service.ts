import { supabase } from './supabase';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  maxProjects: number;
  maxDeployments: number;
  aiFeatures: boolean;
  priority: number;
}

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret: string;
}

export class PaymentService {
  private static instance: PaymentService;
  private stripe: any;

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe() {
    try {
      const { loadStripe } = await import('@stripe/stripe-js');
      this.stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
    }
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
      const { data, error } = await supabase
        .from('subscription_plans')
        .select('*')
        .order('priority', { ascending: true });

      if (error) {
        throw error;
      }

      return data || this.getDefaultPlans();
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      return this.getDefaultPlans();
    }
  }

  private getDefaultPlans(): SubscriptionPlan[] {
    return [
      {
        id: 'free',
        name: 'Free Trial',
        price: 0,
        interval: 'month',
        features: [
          '14-day free trial',
          'Up to 3 projects',
          'Basic AI features',
          'Community support',
          'Standard templates'
        ],
        maxProjects: 3,
        maxDeployments: 5,
        aiFeatures: false,
        priority: 1
      },
      {
        id: 'starter',
        name: 'Starter',
        price: 29,
        interval: 'month',
        features: [
          'Unlimited projects',
          'Advanced AI features',
          'Priority support',
          'Custom domains',
          'Analytics dashboard',
          'Team collaboration'
        ],
        maxProjects: -1,
        maxDeployments: 50,
        aiFeatures: true,
        priority: 2
      },
      {
        id: 'professional',
        name: 'Professional',
        price: 79,
        interval: 'month',
        features: [
          'Everything in Starter',
          'Advanced analytics',
          'Custom branding',
          'API access',
          'White-label options',
          'Priority deployment',
          'Dedicated support'
        ],
        maxProjects: -1,
        maxDeployments: -1,
        aiFeatures: true,
        priority: 3
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 199,
        interval: 'month',
        features: [
          'Everything in Professional',
          'Custom integrations',
          'SLA guarantee',
          'On-premise deployment',
          'Custom training',
          'Dedicated account manager'
        ],
        maxProjects: -1,
        maxDeployments: -1,
        aiFeatures: true,
        priority: 4
      }
    ];
  }

  async createCheckoutSession(planId: string, userId: string): Promise<any> {
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId,
          userId,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/choose-plan?canceled=true`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const session = await response.json();
      return session;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error } = await this.stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
      throw error;
    }
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<PaymentIntent> {
    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const paymentIntent = await response.json();
      return paymentIntent;
    } catch (error) {
      console.error('Error creating payment intent:', error);
      throw error;
    }
  }

  async confirmPayment(paymentIntentId: string, paymentMethod: any): Promise<any> {
    try {
      if (!this.stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error, paymentIntent } = await this.stripe.confirmCardPayment(
        paymentIntentId,
        {
          payment_method: paymentMethod,
        }
      );

      if (error) {
        throw error;
      }

      return paymentIntent;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }

  async createSubscription(userId: string, planId: string, paymentMethodId: string): Promise<any> {
    try {
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          planId,
          paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const subscription = await response.json();
      
      // Update user subscription in database
      await this.updateUserSubscription(userId, subscription);

      return subscription;
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    try {
      const response = await fetch('/api/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to cancel subscription');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  async updateSubscription(subscriptionId: string, planId: string): Promise<any> {
    try {
      const response = await fetch('/api/update-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscriptionId,
          planId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  async getSubscriptionStatus(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching subscription status:', error);
      return null;
    }
  }

  async getBillingHistory(userId: string): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('billing_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching billing history:', error);
      return [];
    }
  }

  async updateUserSubscription(userId: string, subscriptionData: any): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_subscriptions')
        .upsert({
          user_id: userId,
          subscription_id: subscriptionData.id,
          status: subscriptionData.status,
          tier: subscriptionData.planId,
          current_period_start: subscriptionData.current_period_start,
          current_period_end: subscriptionData.current_period_end,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error updating user subscription:', error);
      throw error;
    }
  }

  async createUsageRecord(userId: string, usageType: string, quantity: number = 1): Promise<void> {
    try {
      const { error } = await supabase
        .from('usage_records')
        .insert({
          user_id: userId,
          usage_type: usageType,
          quantity,
          created_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating usage record:', error);
    }
  }

  async getUsageStats(userId: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('usage_records')
        .select('usage_type, quantity, created_at')
        .eq('user_id', userId)
        .gte('created_at', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString());

      if (error) {
        throw error;
      }

      const stats = {
        projects: 0,
        deployments: 0,
        aiRequests: 0,
        storageUsed: 0,
      };

      data?.forEach(record => {
        switch (record.usage_type) {
          case 'project_created':
            stats.projects += record.quantity;
            break;
          case 'deployment':
            stats.deployments += record.quantity;
            break;
          case 'ai_request':
            stats.aiRequests += record.quantity;
            break;
          case 'storage':
            stats.storageUsed += record.quantity;
            break;
        }
      });

      return stats;
    } catch (error) {
      console.error('Error fetching usage stats:', error);
      return {
        projects: 0,
        deployments: 0,
        aiRequests: 0,
        storageUsed: 0,
      };
    }
  }

  async checkUsageLimits(userId: string, action: string): Promise<boolean> {
    try {
      const subscription = await this.getSubscriptionStatus(userId);
      const usage = await this.getUsageStats(userId);

      if (!subscription || subscription.status !== 'active') {
        return false;
      }

      const plan = (await this.getSubscriptionPlans()).find(p => p.id === subscription.tier);
      if (!plan) {
        return false;
      }

      switch (action) {
        case 'create_project':
          return plan.maxProjects === -1 || usage.projects < plan.maxProjects;
        case 'deploy':
          return plan.maxDeployments === -1 || usage.deployments < plan.maxDeployments;
        case 'ai_request':
          return plan.aiFeatures;
        default:
          return true;
      }
    } catch (error) {
      console.error('Error checking usage limits:', error);
      return false;
    }
  }

  async createInvoice(userId: string, amount: number, description: string): Promise<any> {
    try {
      const response = await fetch('/api/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create invoice');
      }

      const invoice = await response.json();
      return invoice;
    } catch (error) {
      console.error('Error creating invoice:', error);
      throw error;
    }
  }

  async sendInvoice(invoiceId: string): Promise<any> {
    try {
      const response = await fetch('/api/send-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send invoice');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error sending invoice:', error);
      throw error;
    }
  }
}

export const paymentService = PaymentService.getInstance(); 