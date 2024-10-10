import { useSelect } from "@wordpress/data";
import { __ } from "@wordpress/i18n";
import { SelectControl } from "@wordpress/components";

interface Category {
  slug: string;
  name: string;
  id: number;
  count: number;
  link: string;
  parent: number;
  taxonomy: string;
}

type TaxonomySelectorProps = {
  attributes: {
    cat: string;
  };
  setAttributes: (newAttributes: { cat: string }) => void;
};

// ToDo: Add QueryControls to filter categories by post type

/**
 * Displays a SelectorControl with all available post categories
 * 
 * Use this component inside InspectorControls > PanelBody or inside a Modal Component
 * Users can select a category from the dropdown. Pass it your category attribute and the * set Attributes function.
 * @param {TaxonomySelectorProps} props
 * @returns {JSX.Element} The JSX representation of the component.
 */
const CategorySelectorControl = ({
  attributes,
  setAttributes,
}: TaxonomySelectorProps) => {
  const cat = attributes.cat || "";

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

  // Function to handle category selection
  const onCategoryChange = (selectedCategorySlug: string) => {
    setAttributes({ cat: selectedCategorySlug });
  };

  const categoryOptions = categories ? categories.map(category => ({
    value: category.slug,
    label: `${category.name} ( ${category.count} ${__("Posts", "rrze-elements-blocks")})`,
  })) : [];

  return (
    <SelectControl
      label={__("Select a Category", "rrze-elements-blocks")}
      value={attributes.cat}
      options={[{ label: "None", value: "" }, ...categoryOptions]}
      onChange={onCategoryChange}
    />
  );
};

export { CategorySelectorControl };
