type Props = { size: number };

export const Icon_NPM = ({ size }: Props) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    className='transition-colors duration-300 ease-in'
    style={{ width: `${size}px`, height: `${size}px` }}
  >
    <path
      d='M0 156.2v171h142.3v28.6H256v-28.6h256v-171z'
      className='fill-red-500 dark:fill-white'
    />
    <path
      d='M85 184.8H28.7v113.7H85v-85h28.7v85h28.6V184.8zM171 184.8v142.3h57.3v-28.7h56.3V184.8zm85 85h-27.7v-56.3H256zM369.7 184.8h-56.4v113.7h56.4v-85h28.6v85H427v-85h28.7v85h28.6V184.8z'
      className='fill-white dark:fill-red-500'
    />
  </svg>
);
