"use client"


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBirthdayCake, FaGift } from 'react-icons/fa';
import { GiBalloons } from 'react-icons/gi';
import Confetti from 'react-confetti';
import Image from 'next/image';





const BirthdayWish = () => {
  const [candlesLit, setCandlesLit] = useState<number>(0);
  const [totalCandles, setTotalCandles] = useState<number>(5);
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0);
  const [totalBalloons, setTotalBalloons] = useState<number>(5);
  const [celebrating, setCelebrating] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });






  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lightCandle = (index: number) => {
    if (candlesLit < totalCandles) {
      setCandlesLit(index + 1);
    }
  };




  const popBalloon = (index: number) => {
    if (balloonsPoppedCount < totalBalloons) {
      setBalloonsPoppedCount(balloonsPoppedCount + 1);
    }
  };



  const celebrate = () => {
    setCelebrating(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000); // Confetti duration
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-200 to-indigo-300 flex items-center justify-center p-4">
      {/* Animated card wrapper */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Birthday card */}
        <div className="card mx-auto overflow-hidden border-2 border-gray-300 shadow-lg p-6 rounded-lg bg-white transform hover:scale-105 transition-transform duration-300">
          {/* Card header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">Happy 12<sup>th</sup> Birthday!</h1>
            <p className="text-2xl font-bold text-pink-900 mt-2">Rudaina Nazeer</p>
            <p className="text-lg text-gray-500 mt-1">22 April</p>
            
            <div className='flex items-center justify-center'>
            <Image
                src="/doodle.jpg"
                alt="Birthday Celebration"
                width={100}
                height={50}
                />
            </div>
            <p className='text-xl font-semibold text-purple-900'>Wishing you all the happiness!</p>
          </div>
          {/* Card content */}
          <div className="space-y-8 text-center mt-6">
            {/* Candles Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Light the candles:</h3>
              <div className="flex justify-center space-x-3">
                {[...Array(totalCandles)].map((_, index) => (
                  <AnimatePresence key={index}>
                    {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                      >
                        <FaBirthdayCake
                          className="w-10 h-10 transition-transform transform hover:scale-110 cursor-pointer"
                          style={{ color: '#FFB703' }}
                          onClick={() => lightCandle(index)}
                        />
                      </motion.div>
                    ) : (
                      <FaBirthdayCake
                        className="w-10 h-10 text-gray-300 transition-transform transform hover:scale-110 cursor-pointer"
                        onClick={() => lightCandle(index)}
                      />
                    )}
                  </AnimatePresence>
                ))}
              </div>
            </div>
            {/* Balloons Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Pop the balloons:</h3>
              <div className="flex justify-center space-x-3">
                {[...Array(totalBalloons)].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 1 }}
                    animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GiBalloons
                      className="w-10 h-10 transition-transform transform hover:scale-110 cursor-pointer"
                      style={{
                        color: index < balloonsPoppedCount ? '#E5E7EB' : ['#FF6B6B', '#FFD93D', '#1E90FF'][index % 3],
                      }}
                      onClick={() => popBalloon(index)}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Celebrate Button */}
          <div className="text-center mt-6">
            <button
              className={`py-2 px-6 rounded-full text-white font-medium shadow-md focus:ring focus:ring-indigo-300 ${
                celebrating
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 transition-all duration-300'
              }`}
              onClick={celebrate}
              disabled={celebrating}
            >
              Celebrate! <FaGift className="ml-2 inline h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={['#FF6B6B', '#FFD93D', '#1E90FF', '#32CD32']}
        />
      )}
    </div>
  );
};

export default BirthdayWish;
