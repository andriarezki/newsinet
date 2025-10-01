import ServicesSection from '../ServicesSection';

export default function ServicesSectionExample() {
  const services = [
    { id: '1', title: 'Data Management', link: '#', icon: 'database' },
    { id: '2', title: 'Web Portal', link: '#', icon: 'globe' },
    { id: '3', title: 'Analytics', link: '#', icon: 'linechart' },
    { id: '4', title: 'Documentation', link: '#', icon: 'filetext' },
    { id: '5', title: 'System Config', link: '#', icon: 'settings' },
    { id: '6', title: 'Cloud Storage', link: '#', icon: 'cloud' },
    { id: '7', title: 'Security', link: '#', icon: 'shield' },
    { id: '8', title: 'User Management', link: '#', icon: 'users' },
    { id: '9', title: 'Reports', link: '#', icon: 'barchart' },
    { id: '10', title: 'Processing', link: '#', icon: 'cpu' },
    { id: '11', title: 'Integration', link: '#', icon: 'layers' },
    { id: '12', title: 'Search Engine', link: '#', icon: 'search' },
    { id: '13', title: 'Archive', link: '#', icon: 'archive' },
    { id: '14', title: 'Knowledge Base', link: '#', icon: 'bookopen' },
    { id: '15', title: 'Mobile App', link: '#', icon: 'smartphone' },
  ];

  return <ServicesSection services={services} />;
}
