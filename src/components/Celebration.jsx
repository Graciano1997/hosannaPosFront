import { useEffect } from "react";
import confetti from "canvas-confetti";

const Celebration = ({ trigger }) => {

    useEffect(() => {
        if (!trigger) return;

        // PUM 💥
        confetti({
            particleCount: 120,
            spread: 90,
            startVelocity: 45,
            origin: {
                x: 0.5,
                y: 0.6,
            },
        });

        // PAHHH 💥
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 120,
                startVelocity: 55,
                origin: {
                    x: 0.2,
                    y: 0.7,
                },
            });

            confetti({
                particleCount: 100,
                spread: 120,
                startVelocity: 55,
                origin: {
                    x: 0.8,
                    y: 0.7,
                },
            });
        }, 250);

    }, [trigger]);

    return null;
};

export default Celebration;