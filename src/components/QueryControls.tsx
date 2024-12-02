import { useSelect } from "@wordpress/data";
import { QueryControls } from "@wordpress/components";

type CustomQueryControlsProps = {
  attributes: {
    cat: string;
    num: number;
  };
  setAttributes: (attributes: Partial<CustomQueryControlsProps["attributes"]>) => void;
};

interface Category {
  slug: string;
  name: string;
  id: number;
  count: number;
  link: string;
  parent: number;
  taxonomy: string;
}

const CustomQueryControls = ({
  attributes,
  setAttributes,
}: CustomQueryControlsProps) => {
  const { categories } = useSelect((select) => {
    const { getEntityRecords } = select("core") as {
      getEntityRecords: (
        entity?: string,
        type?: string,
        query?: { per_page: number }
      ) => Category[];
    };
    return {
      categories: getEntityRecords("taxonomy", "category"),
    };
  }, []);

  const cat = attributes.cat || "";

  const categorySuggestions = categories
    ? categories.reduce(
        (acc, category) => {
          acc[category.slug] = category;
          return acc;
        },
        {} as Record<string, Category>
      )
    : {};

  const selectedCategorySlugs = cat.split(",");

  const selectedCategories = categories
    ? categories
        .filter((category) => selectedCategorySlugs.includes(category.slug))
        .map(({ id, name, parent }) => ({ id, name, parent }))
    : [];

  const onCategoryChange = (
    newValue: string | Array<string | { id: number; value: string }>
  ) => {
    let currentCategorySlugs = cat.toLowerCase().split(",").filter(Boolean);

    const newValueSlugs = (Array.isArray(newValue) ? newValue : [newValue])
      .map((item) => {
        const slug =
          typeof item === "string"
            ? item
            : categories.find((category) => category.id === item.id)?.slug;
        return categories.find((category) => category.slug === slug)
          ? slug
          : null;
      })
      .filter((slug) => slug);

    currentCategorySlugs = currentCategorySlugs.filter((slug) =>
      newValueSlugs.includes(slug)
    );
    newValueSlugs.forEach((slug) => {
      if (!currentCategorySlugs.includes(slug)) {
        currentCategorySlugs.push(slug);
      }
    });

    setAttributes({ cat: currentCategorySlugs.join(",") });
  };

  return (
    <QueryControls
      categorySuggestions={categorySuggestions}
      numberOfItems={attributes.num}
      onCategoryChange={onCategoryChange}
      onNumberOfItemsChange={(value) => setAttributes({ num: value })}
      selectedCategories={selectedCategories}
      minItems = {1}
      maxItems = {15}
    />
  );
};

export { CustomQueryControls };
