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
          className={
            activeCategory === category
              ? 'ring-1 ring-accent-primary/30 light:shadow-md light:shadow-accent-primary/20'
              : 'light:hover:border-accent-primary/40 light:hover:shadow-sm light:hover:shadow-slate-900/8'
          }
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
