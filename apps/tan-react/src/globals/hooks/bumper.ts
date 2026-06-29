export const bumper = (delay = 200) => {
  let _delay = delay;

  const enterStyle = () => {
    _delay += delay;
    return { animationDelay: `${_delay}ms` };
  };

  return enterStyle;
};
