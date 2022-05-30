interface CryptoProps {
  name: string;
  price: string;
}

const CryptoDetails: React.FC<CryptoProps> = ({name, price}: CryptoProps) => {
  return (
    <div>
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}

export default CryptoDetails;