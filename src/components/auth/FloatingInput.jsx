import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  icon: Icon,
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value;

  return (
    <div className="relative w-full">
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground z-10">
            <Icon size={18} />
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 py-4 rounded-xl
            bg-muted/50 border-2 text-foreground
            transition-all duration-300 ease-out
            ${Icon ? 'pl-12' : 'pl-4'}
            ${isActive ? 'pt-6 pb-2' : 'py-4'}
            ${error 
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20' 
              : 'border-border focus:border-primary focus:ring-4 focus:ring-primary/10'
            }
            outline-none
          `}
          placeholder=""
          {...props}
        />
        
        <motion.label
          initial={false}
          animate={{
            y: isActive ? -8 : 0,
            scale: isActive ? 0.75 : 1,
            x: isActive ? (Icon ? -8 : -12) : 0,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`
            absolute left-4 top-1/2 -translate-y-1/2
            pointer-events-none origin-left
            transition-colors duration-200
            ${Icon ? 'left-12' : 'left-4'}
            ${isActive ? 'text-primary' : 'text-muted-foreground'}
            ${error ? 'text-destructive' : ''}
          `}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="text-destructive text-sm mt-1.5 pl-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
