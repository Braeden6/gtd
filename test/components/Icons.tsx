import { 
    AlertCircle, 
    CheckCircle, 
    XCircle,
    Sun,
    Moon,
    LucideIcon
  } from 'lucide-react-native';
  import { cssInterop } from 'nativewind';
  
  function interopIcon(icon: LucideIcon) {
    cssInterop(icon, {
      className: {
        target: 'style',
        nativeStyleToProp: {
          color: true,
          opacity: true,
        },
      },
    });
  }
  

  interopIcon(AlertCircle);
  interopIcon(CheckCircle);
  interopIcon(XCircle);
  interopIcon(Sun);
  interopIcon(Moon);

  export { 
    AlertCircle, 
    CheckCircle, 
    XCircle,
    Sun,
    Moon
  };