import Link from 'next/link';

// Placeholder data for weekly newsletters
const weeklyNewsletters = [
  { slug: '2025-Week-28', title: '周刊第28期', date: '2025-07-14' },
  { slug: '2025-Week-27', title: '周刊第27期', date: '2025-07-07' },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">每周小报</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklyNewsletters.map((newsletter) => (
          <Link key={newsletter.slug} href={`/weekly/${newsletter.slug}`} legacyBehavior>
            <a className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800">
              <h2 className="text-2xl font-semibold mb-2 dark:text-white">{newsletter.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{newsletter.date}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}
