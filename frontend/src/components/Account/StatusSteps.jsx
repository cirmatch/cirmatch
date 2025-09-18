import { motion } from "framer-motion";

export default function StatusSteps({ steps, currentStep }) {
  return (
    <motion.div className="relative w-full py-8">
      <div className="flex items-center justify-between relative">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center text-center w-full z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                  isCompleted
                    ? "bg-teal-500 border-teal-500 text-white"
                    : isActive
                    ? "bg-white border-teal-500 text-teal-600"
                    : "bg-gray-100 border-gray-300 text-gray-400"
                }`}
              >
                <Icon className="text-xl" />
              </div>
              <p
                className={`text-xs mt-2 font-semibold ${
                  isCompleted ? "text-teal-600" : isActive ? "text-teal-700" : "text-gray-400"
                }`}
              >
                {step.label.charAt(0).toUpperCase() + step.label.slice(1)}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
