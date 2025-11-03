'use client';

import { useState } from 'react';
import { X, Plus, Minus, CheckCircle2, Sparkles, Trophy, Shield, BookOpen, Zap, Star, Award } from 'lucide-react';
import dynamic from 'next/dynamic';

const Car3DCard = dynamic(() => import('./Car3DCard'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Laden...</div>
});

const Motor3DCard = dynamic(() => import('./Motor3DCard'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Laden...</div>
});

interface PackageBuilderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'auto' | 'automaat' | 'motor';
}

// Pakket definities met exacte prijzen - AUTO
const autoPackages = {
  10: { name: 'Spoed Pakket', price: 599, hasGuarantee: false },
  20: { name: 'Basis Pakket', price: 1099, hasGuarantee: false },
  25: { name: 'Spoed Pakket+', price: 1250, hasGuarantee: false },
  30: { name: 'Actie Pakket', price: 1575, hasGuarantee: false },
  35: { name: 'Tussen Pakket', price: 1799, hasGuarantee: true },
  40: { name: 'Garantie Pakket', price: 1999, hasGuarantee: true },
  45: { name: 'Compleet Pakket', price: 2299, hasGuarantee: true },
  50: { name: 'Compleet Pakket+', price: 2399, hasGuarantee: true },
};

// Pakket definities met exacte prijzen - MOTOR
const motorPackages = {
  10: { name: 'Spoed Pakket', price: 998, hasGuarantee: true },
  15: { name: 'Spoed Pakket+', price: 1298, hasGuarantee: true },
  20: { name: 'Actie Pakket', price: 1498, hasGuarantee: true },
  25: { name: 'Garantie Pakket', price: 1898, hasGuarantee: true },
};

const autoExperienceLevels = [
  {
    id: 'none',
    title: 'Geen ervaring',
    description: 'Ik heb nog nooit achter het stuur gezeten',
    icon: '🌱',
    recommendedLessons: 45,
    info: 'Gemiddeld heb je 40-50 lessen nodig zonder ervaring'
  },
  {
    id: 'little',
    title: 'Weinig ervaring',
    description: 'Ik heb wat gereden met vrienden/familie',
    icon: '🚗',
    recommendedLessons: 35,
    info: 'Gemiddeld heb je 30-40 lessen nodig met weinig ervaring'
  },
  {
    id: 'some',
    title: 'Enige ervaring',
    description: 'Ik heb al meerdere lessen gehad',
    icon: '⚡',
    recommendedLessons: 25,
    info: 'Gemiddeld heb je 20-30 lessen nodig met enige ervaring'
  },
  {
    id: 'much',
    title: 'Veel ervaring',
    description: 'Ik kan al goed rijden, wil snel examen doen',
    icon: '🏆',
    recommendedLessons: 20,
    info: 'Gemiddeld heb je 15-25 lessen nodig met veel ervaring'
  },
  {
    id: 'refresh',
    title: 'Opfriscursus',
    description: 'Ik wil mijn vaardigheden opfrissen',
    icon: '🔄',
    recommendedLessons: 10,
    info: 'Voor opfriscursus zijn 10-15 lessen meestal voldoende'
  }
];

const motorExperienceLevels = [
  {
    id: 'none',
    title: 'Geen ervaring',
    description: 'Ik heb nog nooit op een motor gezeten',
    icon: '🌱',
    recommendedLessons: 25,
    info: 'Gemiddeld heb je 20-25 lessen nodig zonder ervaring'
  },
  {
    id: 'little',
    title: 'Weinig ervaring',
    description: 'Ik heb wat gereden met vrienden/familie',
    icon: '🏍️',
    recommendedLessons: 20,
    info: 'Gemiddeld heb je 18-22 lessen nodig met weinig ervaring'
  },
  {
    id: 'some',
    title: 'Enige ervaring',
    description: 'Ik heb al meerdere lessen gehad',
    icon: '⚡',
    recommendedLessons: 15,
    info: 'Gemiddeld heb je 12-18 lessen nodig met enige ervaring'
  },
  {
    id: 'much',
    title: 'Veel ervaring',
    description: 'Ik kan al goed rijden, wil snel examen doen',
    icon: '🏆',
    recommendedLessons: 10,
    info: 'Gemiddeld heb je 8-12 lessen nodig met veel ervaring'
  },
  {
    id: 'refresh',
    title: 'Opfriscursus',
    description: 'Ik wil mijn vaardigheden opfrissen',
    icon: '🔄',
    recommendedLessons: 10,
    info: 'Voor opfriscursus zijn 8-12 lessen meestal voldoende'
  }
];

export default function PackageBuilderDialog({ isOpen, onClose, type }: PackageBuilderDialogProps) {
  const [step, setStep] = useState<'experience' | 'customize'>('experience');
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [lessons, setLessons] = useState(20);
  const [examIncluded, setExamIncluded] = useState(false);

  if (!isOpen) return null;

  // Selecteer de juiste data op basis van type
  const isMotor = type === 'motor';
  const packages = isMotor ? motorPackages : autoPackages;
  const experienceLevels = isMotor ? motorExperienceLevels : autoExperienceLevels;
  const availableLessons = isMotor ? [10, 15, 20, 25] : [10, 20, 25, 30, 35, 40, 45, 50];
  const examPrice = 299;

  const selectedPackage = packages[lessons as keyof typeof packages];
  const basePrice = selectedPackage.price;
  // Voor motor is examen altijd inclusief, voor auto optioneel
  const totalPrice = isMotor ? basePrice : (basePrice + (examIncluded ? examPrice : 0));
  const hasGuarantee = selectedPackage.hasGuarantee;

  const titles = {
    auto: 'Auto Rijlessen',
    automaat: 'Automaat Rijlessen',
    motor: 'Motorrijlessen'
  };

  const handleExperienceSelect = (expId: string) => {
    const experience = experienceLevels.find(e => e.id === expId);
    if (experience) {
      setSelectedExperience(expId);
      setLessons(experience.recommendedLessons);
      setStep('customize');
    }
  };

  const resetDialog = () => {
    setStep('experience');
    setSelectedExperience(null);
    setLessons(20);
    setExamIncluded(false);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(10px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      animation: 'fadeIn 0.3s ease-out',
    }}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '32px',
        maxWidth: '1400px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 100px rgba(0, 101, 166, 0.3)',
        border: '2px solid rgba(0, 101, 166, 0.3)',
        animation: 'slideUp 0.4s ease-out',
      }}>
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
            setTimeout(resetDialog, 300);
          }}
          style={{
            position: 'absolute',
            top: '1.5rem',
            right: '1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'all 0.3s ease',
            color: 'white',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(193, 21, 23, 0.9)';
            e.currentTarget.style.transform = 'rotate(90deg) scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.transform = 'rotate(0deg) scale(1)';
          }}
        >
          <X size={24} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', height: '90vh' }}>
          {/* Left Side - 3D Preview */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.1) 0%, rgba(0, 101, 166, 0.05) 100%)',
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRight: '2px solid rgba(0, 101, 166, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Animated Background */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, transparent, rgba(0, 101, 166, 0.1), transparent)',
              backgroundSize: '1000px 100%',
              animation: 'shimmer 3s infinite',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.3) 0%, rgba(0, 101, 166, 0.1) 100%)',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '50px',
                  border: '2px solid rgba(0, 101, 166, 0.4)',
                  marginBottom: '1rem',
                }}>
                  <Sparkles size={20} color="#FFD700" />
                  <span style={{ color: 'white', fontWeight: '600', fontSize: '0.875rem' }}>
                    {step === 'experience' ? 'STAP 1: ERVARING' : 'STAP 2: AANPASSEN'}
                  </span>
                </div>
                <h2 style={{
                  fontSize: '2.5rem',
                  fontWeight: '700',
                  color: 'white',
                  marginBottom: '0.5rem',
                  textShadow: '0 2px 10px rgba(0, 101, 166, 0.5)',
                }}>
                  {titles[type]}
                </h2>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
                  {step === 'experience'
                    ? 'Selecteer jouw ervaring niveau'
                    : 'Pas je pakket aan naar wens'
                  }
                </p>
              </div>

              <div style={{
                width: '500px',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(0, 101, 166, 0.15) 0%, transparent 70%)',
                borderRadius: '24px',
                animation: 'float 3s ease-in-out infinite',
              }}>
                {type === 'motor' ? (
                  <Motor3DCard isCardHovered={true} />
                ) : (
                  <Car3DCard isCardHovered={true} />
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div style={{
            padding: '3rem',
            overflowY: 'auto',
            color: 'white',
          }}>
            {step === 'experience' ? (
              // Step 1: Experience Selection
              <>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                }}>
                  <Trophy size={28} color="#FFD700" />
                  Hoeveel rijervaring heb je al?
                </h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '2rem', fontSize: '1rem' }}>
                  Op basis van je ervaring adviseren we het beste pakket voor jou
                </p>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  {experienceLevels.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => handleExperienceSelect(exp.id)}
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.2) 0%, rgba(0, 101, 166, 0.1) 100%)',
                        border: '2px solid rgba(0, 101, 166, 0.3)',
                        borderRadius: '20px',
                        padding: '1.5rem',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateX(10px) scale(1.02)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 101, 166, 0.3) 0%, rgba(0, 101, 166, 0.2) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(0, 101, 166, 0.6)';
                        e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 101, 166, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateX(0) scale(1)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(0, 101, 166, 0.2) 0%, rgba(0, 101, 166, 0.1) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(0, 101, 166, 0.3)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                          fontSize: '3rem',
                          width: '70px',
                          height: '70px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {exp.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
                            {exp.title}
                          </h4>
                          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            {exp.description}
                          </p>
                          <div style={{
                            display: 'inline-block',
                            background: 'rgba(255, 215, 0, 0.2)',
                            padding: '0.375rem 0.75rem',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: '#FFD700',
                          }}>
                            💡 {exp.info}
                          </div>
                        </div>
                        <div style={{
                          background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.3) 0%, rgba(0, 101, 166, 0.2) 100%)',
                          padding: '0.75rem 1.5rem',
                          borderRadius: '12px',
                          border: '2px solid rgba(0, 101, 166, 0.4)',
                        }}>
                          <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
                            {exp.recommendedLessons}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                            lessen
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              // Step 2: Customize Package
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}>
                    <Award size={28} color="#FFD700" />
                    {selectedPackage.name}
                  </h3>
                  <button
                    onClick={() => setStep('experience')}
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      padding: '0.5rem 1rem',
                      color: 'white',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                  >
                    ← Terug
                  </button>
                </div>

                {/* Package Info Box */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(0, 101, 166, 0.2) 0%, rgba(0, 101, 166, 0.1) 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  marginBottom: '2rem',
                  border: '2px solid rgba(0, 101, 166, 0.3)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>
                        Jouw pakket bevat:
                      </h4>
                    </div>
                    <div style={{
                      background: 'rgba(255, 215, 0, 0.2)',
                      padding: '0.75rem 1.5rem',
                      borderRadius: '12px',
                      border: '2px solid rgba(255, 215, 0, 0.4)',
                    }}>
                      <span style={{ fontSize: '2rem', fontWeight: '700', color: '#FFD700' }}>
                        {lessons}
                      </span>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.8)', marginLeft: '0.5rem' }}>
                        lessen
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>{lessons} {isMotor ? 'Motorrijlessen' : 'Rijlessen'}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Gratis proefles t.w.v. €45</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>Theorie ondersteuning</span>
                    </div>
                    {isMotor ? (
                      <>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                          <CheckCircle2 size={20} color="#10B981" />
                          <span>AVD Praktijkexamen t.w.v. €300</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                          <CheckCircle2 size={20} color="#10B981" />
                          <span>AVB examen t.w.v. €225</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFD700' }}>
                          <Star size={20} color="#FFD700" fill="#FFD700" />
                          <span style={{ fontWeight: '700' }}>Gratis AVB herexamen t.w.v. €225 ⭐</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                          <CheckCircle2 size={20} color="#10B981" />
                          <span>Motorkleding inbegrepen</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFD700' }}>
                          <Star size={20} color="#FFD700" fill="#FFD700" />
                          <span style={{ fontWeight: '700' }}>Binnen 4 weken op examen CBR ⭐</span>
                        </div>
                      </>
                    ) : (
                      hasGuarantee && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#FFD700' }}>
                          <Star size={20} color="#FFD700" fill="#FFD700" />
                          <span style={{ fontWeight: '700' }}>Geld Terug Garantie ⭐</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Adjust Lessons */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                  borderRadius: '20px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  border: '2px solid rgba(255, 255, 255, 0.1)',
                }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
                    Pas aantal lessen aan:
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                    {availableLessons.map((num) => (
                      <button
                        key={num}
                        onClick={() => setLessons(num)}
                        style={{
                          padding: '1rem',
                          borderRadius: '12px',
                          background: lessons === num
                            ? 'linear-gradient(135deg, #0065A6 0%, #004d7a 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                          border: lessons === num
                            ? '2px solid rgba(0, 101, 166, 0.6)'
                            : '2px solid rgba(255, 255, 255, 0.1)',
                          color: 'white',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          fontSize: '1.125rem',
                        }}
                        onMouseOver={(e) => {
                          if (lessons !== num) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }
                        }}
                        onMouseOut={(e) => {
                          if (lessons !== num) {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Exam Option - Alleen voor auto, niet voor motor */}
                {!isMotor && (
                  <button
                    onClick={() => setExamIncluded(!examIncluded)}
                    style={{
                      width: '100%',
                      background: examIncluded
                        ? 'linear-gradient(135deg, rgba(0, 101, 166, 0.3) 0%, rgba(0, 101, 166, 0.2) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                      border: examIncluded
                        ? '2px solid rgba(0, 101, 166, 0.6)'
                        : '2px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '16px',
                      padding: '1.5rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      marginBottom: '2rem',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.boxShadow = examIncluded
                        ? '0 10px 30px rgba(0, 101, 166, 0.4)'
                        : '0 10px 30px rgba(255, 255, 255, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        background: examIncluded
                          ? 'linear-gradient(135deg, #0065A6 0%, #004d7a 100%)'
                          : 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <Trophy size={24} color="white" />
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <h5 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem', color: 'white' }}>
                          Praktijkexamen Inclusief
                        </h5>
                        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
                          CBR examenaanvraag & begeleiding
                        </p>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}>
                        <span style={{
                          fontSize: '1.25rem',
                          fontWeight: '700',
                          color: examIncluded ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                        }}>
                          +€{examPrice}
                        </span>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: examIncluded ? '#10B981' : 'rgba(255, 255, 255, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {examIncluded && <CheckCircle2 size={20} color="white" />}
                        </div>
                      </div>
                    </div>
                  </button>
                )}

                {/* Total & Checkout */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(193, 21, 23, 0.3) 0%, rgba(193, 21, 23, 0.2) 100%)',
                  borderRadius: '20px',
                  padding: '2rem',
                  border: '2px solid rgba(193, 21, 23, 0.4)',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <div>
                      <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                        Totaalprijs
                      </p>
                      <p style={{ fontSize: '3rem', fontWeight: '700', color: 'white', lineHeight: 1 }}>
                        €{totalPrice}
                      </p>
                      <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        {isMotor
                          ? `Alles inclusief! AVD+AVB examen, motorkleding & herexamen • In 2 delen betalen (2x €${basePrice / 2})`
                          : `Basisprijs pakket: €${basePrice}${examIncluded ? ` + Examen: €${examPrice}` : ''}`
                        }
                      </p>
                    </div>
                    <Sparkles size={48} color="#FFD700" />
                  </div>

                  <button
                    onClick={() => {
                      alert(`Pakket wordt aangevraagd!\n\nPakket: ${selectedPackage.name}\nLessen: ${lessons}\nExamen inclusief: ${examIncluded ? 'Ja' : 'Nee'}\nTotaal: €${totalPrice}`);
                    }}
                    style={{
                      width: '100%',
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #C11517 0%, #a00f11 100%)',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '16px',
                      color: 'white',
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 10px 30px rgba(193, 21, 23, 0.4)',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(193, 21, 23, 0.6)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(193, 21, 23, 0.4)';
                    }}
                  >
                    🚀 Proefles Inplannen
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
