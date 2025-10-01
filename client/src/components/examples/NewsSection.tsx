import NewsSection from '../NewsSection';

export default function NewsSectionExample() {
  const newsItems = [
    {
      id: '1',
      title: 'SMARTRI Launches New Research Initiative',
      content: 'We are excited to announce our latest research initiative focused on sustainable palm oil production methods that minimize environmental impact while maximizing yield.',
      imageUrl: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      date: '2025-09-28',
    },
    {
      id: '2',
      title: 'International Collaboration Summit 2025',
      content: 'SMARTRI hosted representatives from over 20 countries to discuss innovations in agricultural technology and sustainable farming practices.',
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      date: '2025-09-25',
    },
    {
      id: '3',
      title: 'Advanced Laboratory Facilities Upgraded',
      content: 'Our state-of-the-art laboratory has been equipped with cutting-edge technology to enhance research capabilities in palm oil processing.',
      imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
      date: '2025-09-20',
    },
  ];

  return <NewsSection newsItems={newsItems} />;
}
