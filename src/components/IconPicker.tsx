import { __ } from '@wordpress/i18n';
import {
  ComboboxControl,
  Button,
  SearchControl,
  __experimentalGrid as Grid,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  __experimentalDivider as Divider,
} from '@wordpress/components';
import {
  useState,
  useEffect,
  useRef,
  memo,
  Fragment,
} from '@wordpress/element';
import { speak } from '@wordpress/a11y';
import type { KeyboardEvent } from 'react';

import fontawesomeIconNames from './assets/fontawesome/fontawesomeIconNames.json';

const solidSpriteUrl = new URL(
  '../_shared/icons/sprites/font-awesome/solid.svg?url',
  import.meta.url,
).toString();

const regularSpriteUrl = new URL(
  '../_shared/icons/sprites/font-awesome/regular.svg?url',
  import.meta.url,
).toString();

const brandsSpriteUrl = new URL(
  '../_shared/icons/sprites/font-awesome/brands.svg?url',
  import.meta.url,
).toString();


const SPRITES: Record<string, string> = {
  solid:   solidSpriteUrl,
  regular: regularSpriteUrl,
  brands:  brandsSpriteUrl,
};

interface BlockAttributes {
  icon: string;      // "solid address-book" usw.
  svgString: string; // `${spriteUrl}#${iconName}`
}
type SetAttributesFunction = (a: Partial<BlockAttributes>) => void;

const updateSvgHref = (
  type: string,
  iconName: string,
  attributes: BlockAttributes,
  setAttributes: SetAttributesFunction,
) => {
  if (!type || !iconName || !SPRITES[type]) return;

  const href = `${SPRITES[type]}#${iconName}`;
  if (href !== attributes.svgString) {
    setAttributes({ svgString: href });
  }
};

const SpriteIcon = ({
                      type,
                      iconName,
                      className = '',
                      onClick,
                      hrefOverride,
                    }: {
  type: string;
  iconName: string;
  className?: string;
  onClick?: () => void;
  hrefOverride?: string;
}) => {
  const href = hrefOverride ?? `${SPRITES[type]}#${iconName}`;
  if (!href) return null;

  return (
    <svg
      role="img"
      aria-hidden="true"
      className={className}
      onClick={onClick}
      style={{ pointerEvents: onClick ? 'auto' : 'none' }}
    >
      {/* @ts-ignore: href ist in SVG2 spezifiziert */}
      <use href={href} />
    </svg>
  );
};

const IconPicker = memo(
  ({
     attributes,
     setAttributes,
   }: {
    attributes: BlockAttributes;
    setAttributes: SetAttributesFunction;
  }) => {
    const [options, setOptions] = useState<{ value: string; label: string }[]>(
      [],
    );
    const [type = '', iconName = ''] = attributes.icon.split(' ');

    /* Optionen einmal erzeugen */
    useEffect(() => {
      const toOptions = (icons: string[], label: string) =>
        icons.map((icon) => ({
          value: `${label} ${icon}`,
          label: `${icon} (${label})`,
        }));

      setOptions([
        ...toOptions(fontawesomeIconNames.solid, 'solid'),
        ...toOptions(fontawesomeIconNames.regular, 'regular'),
        ...toOptions(fontawesomeIconNames.brands, 'brands'),
      ]);
    }, []);

    /* svgString synchron halten */
    useEffect(() => {
      updateSvgHref(type, iconName, attributes, setAttributes);
    }, [type, iconName, attributes, setAttributes]);

    return (
      <>
        <ComboboxControl
          label={__('Select an icon', 'rrze-elements-blocks')}
          value={attributes.icon}
          options={options}
          allowReset={false}
          onChange={(newIcon) => setAttributes({ icon: newIcon })}
        />

        {attributes.icon && (
          <Fragment>
            <SpriteIcon
              type={type}
              iconName={iconName}
              hrefOverride={attributes.svgString}
              className="elements-blocks-icon-selector-display"
            />
            <Button
              variant="secondary"
              onClick={() => setAttributes({ icon: '', svgString: '' })}
            >
              {__('Remove Icon', 'rrze-elements-blocks')}
            </Button>
          </Fragment>
        )}
      </>
    );
  },
);
IconPicker.displayName = 'IconPicker';

type Option = { value: string; label: string };
const renderIconButton = (
  opt: Option,
  activeIcon: string,
  setIcon: (v: string) => void,
) => {
  const [btnType, btnName] = opt.value.split(' ');
  const isActive = opt.value === activeIcon;

  return (
    <Button
      key={opt.value}
      isPressed={isActive}
      variant={isActive ? 'primary' : undefined}
      size="compact"
      className="elements-blocks-icon-Button"
      label={opt.label}
      showTooltip
      onClick={() => setIcon(isActive ? '' : opt.value)}
    >
      <SpriteIcon
        type={btnType}
        iconName={btnName}
        className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
      />
    </Button>
  );
};

const IconPickerModalInset = memo(
  ({
     attributes,
     setAttributes,
   }: {
    attributes: BlockAttributes;
    setAttributes: SetAttributesFunction;
  }) => {
    const [solidIcons, setSolidIcons] = useState<Option[]>([]);
    const [regularIcons, setRegularIcons] = useState<Option[]>([]);
    const [brandIcons, setBrandIcons] = useState<Option[]>([]);
    const [allIcons, setAllIcons] = useState<Option[]>([]);
    const [filteredIcons, setFilteredIcons] = useState<Option[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const searchRef = useRef<HTMLInputElement>(null);
    const [type = '', iconName = ''] = attributes.icon.split(' ');

    /* Optionen aufbauen */
    useEffect(() => {
      const toOpts = (icons: string[], label: string) =>
        icons.map((i) => ({ value: `${label} ${i}`, label: `${i} (${label})` }));

      setSolidIcons(toOpts(fontawesomeIconNames.solid, 'solid'));
      setRegularIcons(toOpts(fontawesomeIconNames.regular, 'regular'));
      setBrandIcons(toOpts(fontawesomeIconNames.brands, 'brands'));
    }, []);

    useEffect(() => {
      setAllIcons([...solidIcons, ...regularIcons, ...brandIcons]);
    }, [solidIcons, regularIcons, brandIcons]);

    /* svgString synchron halten */
    useEffect(() => {
      updateSvgHref(type, iconName, attributes, setAttributes);
    }, [type, iconName, attributes, setAttributes]);

    /* Suche */
    const runSearch = () => {
      const q = searchQuery.trim().toLowerCase();
      if (!q) {
        setFilteredIcons(allIcons);
        setShowSearch(false);
        return;
      }
      setFilteredIcons(
        allIcons.filter(({ value }) => {
          const [t, n] = value.split(' ');
          return t.includes(q) || n.includes(q);
        }),
      );
      setShowSearch(true);
      speak(__('The search results got updated.', 'rrze-elements-blocks'));
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Enter' && runSearch();

    return (
      <>
        <p>
          {__('Icons are provided by ', 'rrze-elements-blocks')}
          <a href="https://fontawesome.com" target="_blank" rel="noopener noreferrer">
            Font&nbsp;Awesome
          </a>
          {__(
            '. You can search for an icon by typing its Font Awesome name in the search field below.',
            'rrze-elements-blocks',
          )}
        </p>

        {/* Suche */}
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Spacer paddingTop="1rem" paddingBottom="1rem">
            <Heading>{__('Search for an Icon', 'rrze-elements-blocks')}</Heading>
          </Spacer>

          <SearchControl
            label={__('Search for an Icon', 'rrze-elements-blocks')}
            value={searchQuery}
            onChange={setSearchQuery}
            onKeyDown={onKeyDown}
            ref={searchRef}
          />
          <Button variant="secondary" onClick={runSearch}>
            {__('Search for Icons', 'rrze-elements-blocks')}
          </Button>

          {/* Aktuell gewähltes Icon */}
          {attributes.icon && (
            <>
              <Spacer paddingBottom="1rem" paddingTop="1rem">
                <Divider />
              </Spacer>
              <Fragment>
                <SpriteIcon
                  type={type}
                  iconName={iconName}
                  hrefOverride={attributes.svgString}
                  className="elements-blocks-icon-selector-display"
                />
                <Button
                  variant="secondary"
                  onClick={() => setAttributes({ icon: '', svgString: '' })}
                >
                  {__('Remove Icon', 'rrze-elements-blocks')}
                </Button>
              </Fragment>
            </>
          )}
        </Spacer>

        {/* Suchergebnisse */}
        {showSearch && (
          <>
            <Divider />
            <Spacer paddingTop="1rem" paddingBottom="1rem">
              <Heading>{__('Search Results', 'rrze-elements-blocks')}</Heading>
              {filteredIcons.length ? (
                <Grid columns={12}>
                  {filteredIcons.map((opt) =>
                    renderIconButton(opt, attributes.icon, (v) =>
                      setAttributes({ icon: v }),
                    ),
                  )}
                </Grid>
              ) : (
                <p>
                  {__(
                    'No icons found. Please try a different search term.',
                    'rrze-elements-blocks',
                  )}
                </p>
              )}
            </Spacer>
          </>
        )}

        {/* Solid */}
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__('Solid Icons', 'rrze-elements-blocks')}</Heading>
          <Grid columns={12}>
            {solidIcons.map((opt) =>
              renderIconButton(opt, attributes.icon, (v) =>
                setAttributes({ icon: v }),
              ),
            )}
          </Grid>
        </Spacer>

        {/* Regular */}
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__('Regular Icons', 'rrze-elements-blocks')}</Heading>
          <Grid columns={12}>
            {regularIcons.map((opt) =>
              renderIconButton(opt, attributes.icon, (v) =>
                setAttributes({ icon: v }),
              ),
            )}
          </Grid>
        </Spacer>

        {/* Brands */}
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__('Brand Icons', 'rrze-elements-blocks')}</Heading>
          <Grid columns={12}>
            {brandIcons.map((opt) =>
              renderIconButton(opt, attributes.icon, (v) =>
                setAttributes({ icon: v }),
              ),
            )}
          </Grid>
        </Spacer>

        <Spacer paddingBottom="1rem">
          <Divider />
        </Spacer>
      </>
    );
  },
);
IconPickerModalInset.displayName = 'IconPickerModalInset';

interface LegacyIconProps {
  type: string;
  iconName: string;
  attributes?: BlockAttributes;
  setAttributes?: SetAttributesFunction;
  defaultClass?: string;
  className?: string;
  onClick?: () => void;
  hrefOverride?: string;
  iconValue?: string;
}

const IconMarkComponent = ({
                             type,
                             iconName,
                             attributes,
                             defaultClass = '',
                             className = '',
                             onClick,
                             hrefOverride,
                             iconValue = '',
                           }: LegacyIconProps) => {
  let t = type;
  let n = iconName;
  if (iconValue) {
    const [vType, vName] = iconValue.split(' ');
    if (vType && vName) {
      t = vType;
      n = vName;
    }
  }

  const href =
    hrefOverride ||
    attributes?.svgString ||
    `${SPRITES[t]}#${n}`;

  return (
    <SpriteIcon
      type={t}
      iconName={n}
      className={`${defaultClass} ${className}`.trim()}
      onClick={onClick}
      hrefOverride={href}
    />
  );
};

export { IconPicker, IconPickerModalInset, IconMarkComponent };
