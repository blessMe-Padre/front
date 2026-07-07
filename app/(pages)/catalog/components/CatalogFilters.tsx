"use client";

import Link from "next/link";
import { useRef } from "react";
import { CatalogMenuItem } from "@/app/types/types";
import { CatalogFilters as CatalogFilterValues } from "@/app/utils/catalogQueries";

import styles from "../style.module.scss";

type CatalogFiltersProps = {
    currentSlug: string;
    subcategories: CatalogMenuItem[];
    filters: CatalogFilterValues;
    filterOptions: {
        manufacturers: string[];
        countries: string[];
        uvResistances: string[];
    };
};

const getCategoryHref = (currentSlug: string, filters: CatalogFilterValues, categorySlug?: string) => {
    const params = new URLSearchParams();

    if (categorySlug) {
        params.set("category", categorySlug);
    }

    if (filters.priceFrom) {
        params.set("priceFrom", filters.priceFrom);
    }

    if (filters.priceTo) {
        params.set("priceTo", filters.priceTo);
    }

    if (filters.inStock) {
        params.set("inStock", "1");
    }

    filters.manufacturer?.forEach((manufacturer) => params.append("manufacturer", manufacturer));
    filters.country?.forEach((country) => params.append("country", country));
    filters.uvResistance?.forEach((uvResistance) => params.append("uvResistance", uvResistance));

    const query = params.toString();
    return query ? `/catalog/${currentSlug}?${query}` : `/catalog/${currentSlug}`;
};

const getResetHref = (currentSlug: string, categorySlug?: string) => {
    const params = new URLSearchParams();

    if (categorySlug) {
        params.set("category", categorySlug);
    }

    const query = params.toString();
    return query ? `/catalog/${currentSlug}?${query}` : `/catalog/${currentSlug}`;
};

const getToggleClassName = (isActive: boolean) =>
    isActive ? `${styles.filter_toggle} ${styles.filter_toggle_active}` : styles.filter_toggle;

const hasSelectedValues = (values?: string[]) => Boolean(values?.length);

const getOptions = (options: string[], selectedValues: string[] = []) => {
    const missingSelectedValues = selectedValues.filter((selectedValue) => !options.includes(selectedValue));

    if (missingSelectedValues.length === 0) {
        return options;
    }

    return [...missingSelectedValues, ...options];
};

export default function CatalogFilters({ currentSlug, subcategories, filters, filterOptions }: CatalogFiltersProps) {
    const isPriceActive = Boolean(filters.priceFrom || filters.priceTo || filters.inStock);
    const isManufacturerActive = hasSelectedValues(filters.manufacturer);
    const isCountryActive = hasSelectedValues(filters.country);
    const isUvResistanceActive = hasSelectedValues(filters.uvResistance);
    const dropdownRefs = useRef<(HTMLDetailsElement | null)[]>([]);

    const handleDropdownToggle = (currentIndex: number) => {
        const currentDropdown = dropdownRefs.current[currentIndex];

        if (!currentDropdown?.open) {
            return;
        }

        dropdownRefs.current.forEach((dropdown, index) => {
            if (dropdown && index !== currentIndex) {
                dropdown.open = false;
            }
        });
    };

    return (
        <>
        {subcategories.length > 0 && (
            <nav aria-label="Фильтр по подкатегориям">
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <Link
                            href={getCategoryHref(currentSlug, filters)}
                            aria-current={!filters.category ? "page" : undefined}
                        >
                            <p>Все товары</p>
                        </Link>
                    </li>
                    {subcategories.map((category) => (
                        <li key={category.id} className={styles.item}>
                            <Link
                                href={getCategoryHref(currentSlug, filters, category.slug)}
                                aria-current={filters.category === category.slug ? "page" : undefined}
                            >
                                <p>{category.name}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        )}

        <form className={styles.filters} action={`/catalog/${currentSlug}`} method="get">
            {filters.category && <input type="hidden" name="category" value={filters.category} />}

            <div className={styles.filters_bar}>
                <details
                    className={styles.filter_dropdown}
                    ref={(element) => {
                        dropdownRefs.current[0] = element;
                    }}
                    onToggle={() => handleDropdownToggle(0)}
                >
                    <summary className={getToggleClassName(isPriceActive)}>Цена</summary>
                    <div className={styles.filter_panel}>
                        <div className={styles.filter_row}>
                            <label className={styles.filter_field}>
                                <input
                                    type="number"
                                    name="priceFrom"
                                    min="0"
                                    step="100"
                                    inputMode="numeric"
                                    placeholder="от"
                                    defaultValue={filters.priceFrom ?? ""}
                                />
                            </label>

                            <label className={styles.filter_field}>
                                <input
                                    type="number"
                                    name="priceTo"
                                    min="0"
                                    step="100"
                                    inputMode="numeric"
                                    placeholder="до"
                                    defaultValue={filters.priceTo ?? ""}
                                />
                            </label>
                        </div>

                        <label className={styles.filter_checkbox}>
                            <input
                                type="checkbox"
                                name="inStock"
                                value="1"
                                defaultChecked={filters.inStock}
                            />
                            <span>В наличии</span>
                        </label>

                        <button className={styles.filters_submit} type="submit">
                            Применить
                        </button>
                    </div>
                </details>

                <details
                    className={styles.filter_dropdown}
                    ref={(element) => {
                        dropdownRefs.current[1] = element;
                    }}
                    onToggle={() => handleDropdownToggle(1)}
                >
                    <summary className={getToggleClassName(isManufacturerActive)}>Производитель</summary>
                    <div className={styles.filter_panel}>
                        <fieldset className={styles.filter_options}>
                            <legend>Производитель</legend>
                            {getOptions(filterOptions.manufacturers, filters.manufacturer).map((manufacturer) => (
                                <label key={manufacturer} className={styles.filter_option}>
                                    <input
                                        type="checkbox"
                                        name="manufacturer"
                                        value={manufacturer}
                                        defaultChecked={filters.manufacturer?.includes(manufacturer)}
                                    />
                                    <span>{manufacturer}</span>
                                </label>
                            ))}
                        </fieldset>

                        <button className={styles.filters_submit} type="submit">
                            Применить
                        </button>
                    </div>
                </details>

                <details
                    className={styles.filter_dropdown}
                    ref={(element) => {
                        dropdownRefs.current[2] = element;
                    }}
                    onToggle={() => handleDropdownToggle(2)}
                >
                    <summary className={getToggleClassName(isCountryActive)}>Страна происхождения</summary>
                    <div className={styles.filter_panel}>
                        <fieldset className={styles.filter_options}>
                            <legend>Страна происхождения</legend>
                            {getOptions(filterOptions.countries, filters.country).map((country) => (
                                <label key={country} className={styles.filter_option}>
                                    <input
                                        type="checkbox"
                                        name="country"
                                        value={country}
                                        defaultChecked={filters.country?.includes(country)}
                                    />
                                    <span>{country}</span>
                                </label>
                            ))}
                        </fieldset>

                        <button className={styles.filters_submit} type="submit">
                            Применить
                        </button>
                    </div>
                </details>

                <details
                    className={styles.filter_dropdown}
                    ref={(element) => {
                        dropdownRefs.current[3] = element;
                    }}
                    onToggle={() => handleDropdownToggle(3)}
                >
                    <summary className={getToggleClassName(isUvResistanceActive)}>УФ-стойкость</summary>
                    <div className={styles.filter_panel}>
                        <fieldset className={styles.filter_options}>
                            <legend>УФ-стойкость</legend>
                            {getOptions(filterOptions.uvResistances, filters.uvResistance).map((uvResistance) => (
                                <label key={uvResistance} className={styles.filter_option}>
                                    <input
                                        type="checkbox"
                                        name="uvResistance"
                                        value={uvResistance}
                                        defaultChecked={filters.uvResistance?.includes(uvResistance)}
                                    />
                                    <span>{uvResistance}</span>
                                </label>
                            ))}
                        </fieldset>

                        <button className={styles.filters_submit} type="submit">
                            Применить
                        </button>
                    </div>
                </details>

                {(isPriceActive || isManufacturerActive || isCountryActive || isUvResistanceActive) && (
                    <Link className={styles.filters_reset} href={getResetHref(currentSlug, filters.category)}>
                        Сбросить
                    </Link>
                )}
            </div>
        </form>
        </>
    );
}
