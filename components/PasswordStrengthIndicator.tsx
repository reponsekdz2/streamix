import React from 'react';

interface PasswordStrengthIndicatorProps {
  strength: number; // 0 (very weak) to 4 (very strong)
}

const strengthLevels = [
  { label: 'Very Weak', color: 'bg-red-700' },
  { label: 'Weak', color: 'bg-red-500' },
  { label: 'Medium', color: 'bg-yellow-500' },
  { label: 'Strong', color: 'bg-green-500' },
  { label: 'Very Strong', color: 'bg-green-700' },
];

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({ strength }) => {
  const currentStrength = strengthLevels[strength] || strengthLevels[0];
  
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center text-xs text-zinc-400 mb-1">
        <span>Password strength:</span>
        <span className={`font-semibold ${strength > 1 ? 'text-white' : ''}`}>{currentStrength.label}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-colors ${index <= strength ? currentStrength.color : 'bg-zinc-700'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;
