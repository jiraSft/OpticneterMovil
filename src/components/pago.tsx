import React, { useState } from 'react';
import { IonButton, IonInput, IonLabel, IonCard, IonCardContent, IonToast } from '@ionic/react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QF7CwP4u0AspHWqVkcLHlGObKirereYBP7bQJOetZ3Bgv1HQDXfCaEQBWM8cv3kvJ69rNvjdOwsMw4nzqgSxGhN00ik1ViWMd'); // Reemplaza con tu clave pública

const Payment: React.FC<{ amount: number }> = ({ amount }) => {
    const [showToast, setShowToast] = useState(false);
    const [error, setError] = useState<string | null>(null); // Cambia el estado a string | null

    const handlePayment = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            setError('Stripe no se ha cargado correctamente.');
            setShowToast(true);
            return;
        }

        const response = await fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        if (!response.ok) {
            setError('Error al crear la sesión de pago.');
            setShowToast(true);
            return;
        }

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            setShowToast(true);
        }
    };

    return (
        <IonCard>
            <IonCardContent>
                <IonLabel>Pago de ${amount}</IonLabel>
                <IonButton onClick={handlePayment} expand="full">
                    Pagar
                </IonButton>

                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => {
                        setShowToast(false);
                        setError(null); // Resetea el error al cerrar el toast
                    }}
                    message={error || ''} // Asegúrate de que el mensaje sea una cadena
                    duration={2000}
                />
            </IonCardContent>
        </IonCard>
    );
};

export default Payment;
