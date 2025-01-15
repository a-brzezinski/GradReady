interface Props {
  text: string;
}

const ErrorMessage = ({ text }: Props) => {
  return <p className="text-balance text-center text-xl md:text-2xl">{text}</p>;
};
export default ErrorMessage;
