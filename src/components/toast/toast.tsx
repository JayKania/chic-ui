import React, { useEffect } from 'react';
import {
  ToastElement,
  ToastTitle,
  ToastMessage,
  ToastIcon
} from './styled';
import { themeType } from '../../config/themes';

export interface ToastProps {
  id: string;
  close: () => void;
  type?: themeType;
  title: string;
  message?: string;
  icon?: React.ElementType;
  duration?: number;
}

const Toast: React.FC<ToastProps> = (props) => {
  const {
    close,
    message,
    title,
    duration = 0,
    id,
    type = 'primary',
    icon
  } = props;

  useEffect(() => {
    if (!duration) return;

    const timer = setTimeout(() => {
      close();
    }, duration);

    console.log('RENDERED');

    return () => clearTimeout(timer);
  }, [close, duration]);

  return (
    <ToastElement
      close={close}
      message={message}
      title={title}
      duration={duration}
      id={id}
      type={type}
      icon={icon}
    >
      <button onClick={close}>X</button>
      {icon && <ToastIcon as={icon} />}
      <div>
        <ToastTitle>{title}</ToastTitle>
        <ToastMessage>{message}</ToastMessage>
      </div>
    </ToastElement>
  );
};

const shouldRerender = (prevProps: ToastProps, nextProps: ToastProps) => {
  return prevProps.id === nextProps.id;
};
export default React.memo(Toast, shouldRerender);
