import FeatherIcon from 'feather-icons-react';

const Icon = ({ type, size = '1em' }) => {
  return (
    <span style={{ lineHeight: '1' }}>
      <FeatherIcon size={size} icon={type} />
    </span>
  );
};

export default Icon;
