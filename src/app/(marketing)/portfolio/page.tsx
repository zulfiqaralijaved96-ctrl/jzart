import { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { PortfolioClient } from '@/components/marketing/portfolio/PortfolioClient';

export const metadata: Metadata = {
  title: 'Portfolio | JZ Arts Mascot Costume Manufacturing',
  description: 'Explore our premium showcase of handcrafted physical custom mascot costumes built for sports franchises, schools, and global brands, prioritizing agility, durability, and performer ventilation.',
};

export default async function PortfolioPage() {
  // Fetch only published items, ordered correctly
  const items = await prisma.portfolioItem.findMany({
    where: { isPublished: true },
    orderBy: [
      { order: 'asc' },
      { createdAt: 'desc' }
    ]
  });

  // Extract unique categories for the filter bar
  const categories = Array.from(new Set(items.map(item => item.category))).filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <PortfolioClient initialItems={items} categories={categories} />
    </main>
  );
}
