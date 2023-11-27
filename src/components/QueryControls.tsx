import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { QueryControls } from "@wordpress/components";

type CustomQueryControlsProps = {
  attributes: {
    cat: string;
  };
  setAttributes: (newAttributes: { cat: string }) => void;
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

  const categoryOptions = categories
    ? categories.map((category) => ({
        id: category.id,
        name: category.name,
        parent: category.parent,
        slug: category.slug,
      }))
    : [];

  const selectedCategorySlugs = cat.split(",");

  const selectedCategories = categories
    ? categories
        .filter((category) => selectedCategorySlugs.includes(category.slug))
        .map(({ id, name, parent }) => ({ id, name, parent }))
    : [];

  const onCategoryChange = (
    newValue: string | Array<string | { id: number; value: string }>
  ) => {
    let currentCategorySlugs = cat.split(",").filter(Boolean);

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

    console.log(currentCategorySlugs);
    setAttributes({ cat: currentCategorySlugs.join(",") });
  };

  return (
    <QueryControls
      authorList={[
        {
          id: 1,
          name: "admin",
        },
        {
          id: 2,
          name: "editor",
        },
      ]}
      categorySuggestions={categorySuggestions}
      numberOfItems={5}
      onAuthorChange={function noRefCheck() {}}
      onCategoryChange={onCategoryChange}
      onNumberOfItemsChange={function noRefCheck() {}}
      onOrderByChange={function noRefCheck() {}}
      onOrderChange={function noRefCheck() {}}
      order="desc"
      orderBy="date"
      selectedAuthorId={1}
      selectedCategories={selectedCategories}
    />
  );
};

export { CustomQueryControls };
