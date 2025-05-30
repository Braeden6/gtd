import { 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Sun,
  Moon,
  LucideIcon,
  LogOut,
  Camera,
  Trash2,
  ArrowLeft,
  Maximize2,
  X,
  CheckCheck,
  Mic,
  Play,
  Pause,
  StopCircle
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
interopIcon(LogOut);
interopIcon(Camera);
interopIcon(Trash2);
interopIcon(ArrowLeft);
interopIcon(Maximize2);
interopIcon(X);
interopIcon(CheckCheck);
interopIcon(Mic);
interopIcon(Play);
interopIcon(Pause);
interopIcon(StopCircle);

export { 
  AlertCircle, 
  CheckCircle, 
  XCircle,
  Sun,
  Moon,
  LogOut,
  Camera,
  Trash2,
  ArrowLeft,
  Maximize2,
  X,
  CheckCheck,
  Mic,
  Play,
  Pause,
  StopCircle
}