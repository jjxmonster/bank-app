import type { NextPage } from 'next';

const Home: NextPage = () => {
   return <div>JJ BANK</div>;
};

export default Home;

export const getServerSideProps = async () => {
   const response = await fetch('http://localhost:3000/api/users');
   const data = await response.json();

   return { props: { users: data } };
};
