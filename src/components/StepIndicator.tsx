
import React from 'react';
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  number: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center max-w-4xl mx-auto relative">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center relative z-10">
            <div className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium mb-2 transition-all duration-300",
              currentStep >= step.number 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-600'
            )}>
              {currentStep > step.number ? (
                <CheckCircle className="h-6 w-6" />
              ) : (
                step.number
              )}
            </div>
            <span className={cn(
              "text-xs text-center font-medium transition-colors duration-300",
              currentStep >= step.number ? "text-blue-600" : "text-gray-500"
            )}>
              {step.title}
            </span>
          </div>
        ))}
        
        {/* Progress line */}
        <div className="absolute top-6 left-0 w-full h-0.5 bg-gray-200 -z-10">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{ 
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
