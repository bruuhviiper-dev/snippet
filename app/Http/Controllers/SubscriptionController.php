<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function pricing()
    {
        return Inertia::render('Pricing', [
            'stripeKey' => env('STRIPE_KEY'),
        ]);
    }

    public function checkout(Request $request)
    {
        $user = Auth::user();

        // Check if already subscribed
        if ($user->subscribed('pro')) {
            return redirect()->route('dashboard')->with('success', 'Você já é um usuário Pro!');
        }

        $priceId = $request->input('price_id', env('STRIPE_PRICE_ID_MONTHLY'));

        return $user->newSubscription('pro', $priceId)
            ->checkout([
                'success_url' => route('dashboard') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('pricing'),
            ]);
    }

    public function portal(Request $request)
    {
        return $request->user()->redirectToBillingPortal(route('dashboard'));
    }
}
