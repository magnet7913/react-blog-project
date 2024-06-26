import cls from 'classnames';
import IconLoading from '../IconLoading';
import './button.css';

function Button({
  id,
  type = 'default',
  loading,
  loadingPos = 'left',
  size,
  as = 'button',
  htmlType,
  className,
  children,
  ...restProps
}) {
  const classes = cls(
    'btn',
    {
      'btn-default': type === 'default',
      'btn-category': type === 'category',
      'btn-primary': type === 'primary',
      'btn-size-large': size === 'large',
    },
    className
  );

  const content = (
    <>
      {loading && loadingPos === 'left' && <IconLoading />}
      {children}
      {loading && loadingPos === 'right' && <IconLoading />}
    </>
  );

  const injectedProps = {
    id,
    className: classes,
    type: htmlType,
    ...restProps,
  };

  if (as === 'a') {
    return <a {...injectedProps}>{content}</a>;
  }

  return <button {...injectedProps}>{content}</button>;
}

export default Button;
