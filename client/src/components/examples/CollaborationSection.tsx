import CollaborationSection from '../CollaborationSection';

export default function CollaborationSectionExample() {
  const logos = [
    { id: '1', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+1', name: 'Partner 1' },
    { id: '2', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+2', name: 'Partner 2' },
    { id: '3', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+3', name: 'Partner 3' },
    { id: '4', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+4', name: 'Partner 4' },
    { id: '5', imageUrl: 'https://via.placeholder.com/200x100/22c55e/ffffff?text=Partner+5', name: 'Partner 5' },
  ];

  return <CollaborationSection logos={logos} />;
}
