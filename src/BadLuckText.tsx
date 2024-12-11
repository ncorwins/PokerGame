import { motion } from 'framer-motion';
import * as React from 'react';

const BadLuckText = ({ luck }) => {

    return (
        <div
            className="text-center mt-6 mx-auto"
            style={{ background: 'transparent', maxWidth: '500px' }}
        >
            {luck === 'bad' && (
                <motion.h1
                    className="text-4xl font-bold text-red-600"
                    animate={{
                        scale: [1, 1.5, 1],  // Grow to 1.5x and shrink back
                        opacity: [1, 0.5, 1], // Optional: add fading effect
                        textShadow: [
                            "0px 0px 10px rgba(255, 0, 0, 0.8)", // Red glow
                            "0px 0px 20px rgba(255, 0, 0, 0.8)",
                            "0px 0px 30px rgba(255, 0, 0, 0.8)"
                        ], // Red glowing effect
                    }}
                    transition={{
                        duration: 1.5,        // Animation duration
                        ease: "easeInOut",    // Smooth transition
                        repeat: Infinity,     // Repeat infinitely
                        repeatDelay: 0,       // Delay between repeats
                    }}
                >
                    Bad Luck!
                </motion.h1>
            )}
            {luck === 'god' && (
                <motion.h1
                    className="text-4xl font-bold text-yellow-600"
                    animate={{
                        scale: [1, 1.5, 1],  // Grow to 1.5x and shrink back
                        opacity: [1, 0.5, 1], // Optional: add fading effect
                        textShadow: [
                            "0px 0px 10px rgba(255, 223, 0, 0.8)", // Golden glow
                            "0px 0px 20px rgba(255, 223, 0, 0.8)",
                            "0px 0px 30px rgba(255, 223, 0, 0.8)"
                        ], // Golden glowing effect
                    }}
                    transition={{
                        duration: 1.5,        // Animation duration
                        ease: "easeInOut",    // Smooth transition
                        repeat: Infinity,     // Repeat infinitely
                        repeatDelay: 0,       // Delay between repeats
                    }}
                >
                    God Luck!
                </motion.h1>
            )}
        </div>
    );
};

export default BadLuckText;
