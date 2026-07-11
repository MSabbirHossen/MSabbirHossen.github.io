import Button from '../common/Button';

export default function ProjectFilters({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory(category)}
          aria-pressed={activeCategory === category}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
