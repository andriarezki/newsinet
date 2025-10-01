import Header from '../Header';

export default function HeaderExample() {
  return (
    <Header
      divisionName="SMARTRI Information Data Management Center"
      isAdmin={true}
      onLogout={() => console.log('Logout clicked')}
    />
  );
}
