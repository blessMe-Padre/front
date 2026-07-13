"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from "react";

import fetchData from "@/app/utils/fetchData";

import styles from "./style.module.scss";

type ResponseItem = {
  title?: string;
  link?: string;
  file?: {
    url: string;
  };
  type: string;
  documentId: string;
  name?: string;
  slug?: string;
  hero_title?: string;
  kategoriis?: SearchCategory[];
  // сюда дописывать другие поля из API
};

type SearchCategory = {
  id?: number;
  documentId?: string;
  name?: string;
  slug?: string;
};

type ApiListResponse<T> = {
  data?: T[];
};

type SearchProps = {
  setSearchOpened?: (value: boolean) => void;
};

export default function Search({ setSearchOpened }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [dataList, setData] = useState<ResponseItem[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const closeSearch = () => {
    setIsFocused(false);
    inputRef.current?.blur();
    setSearchOpened?.(false);
    setInputValue("");
  };
  const newsList = dataList.filter((item) => item.type === "news");

  const groups = new Map<
    string,
    { category: SearchCategory; products: ResponseItem[] }
  >();

  dataList
    .filter((item) => item.type === "product")
    .forEach((product) => {
      const categories =
        product.kategoriis && product.kategoriis.length > 0
          ? product.kategoriis
          : [{ name: "Без категории" }];

      categories.forEach((category) => {
        const groupKey =
          category.documentId ?? category.slug ?? category.name ?? "no-category";
        const currentGroup = groups.get(groupKey);

        if (currentGroup) {
          currentGroup.products.push(product);
          return;
        }

        groups.set(groupKey, {
          category,
          products: [product],
        });
      });
    });

  const productGroups = Array.from(groups.values());

  const domain = "";

  // Исправлено: типизация для setTimeout/clearTimeout
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setInputValue("");
    setData([]);
    setLoading(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);

    if (value.trim() === "") {
      setData([]);
      setLoading(false);
    } else {
      setLoading(true);
    }
  };

  const handleSearchSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    // Редирект
    router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
    closeSearch();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue.trim() === "") return;
      // Редирект
      router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
      closeSearch();
    }
  };

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "i");
    const match = text.match(regex);

    if (!match) return text;

    const parts = text.split(regex);
    return (
      <>
        {parts[0]}
        <mark>{parts[1]}</mark>
        {parts[2]}
      </>
    );
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    if (inputValue.trim() === "") {
      return;
    }

    debounceTimeout.current = setTimeout(async () => {
      try {
        // Тут можно добавить другие API источники, добавить в промис и объединить результаты
        const newsUrl = `${domain}/api/novostis?filters[title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
        const productsUrl = `${domain}/api/tovars?filters[title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;

        const [
          newsResult,
          productsResult,

        ] = await Promise.all([
          fetchData<ApiListResponse<ResponseItem>>(newsUrl),
          fetchData<ApiListResponse<ResponseItem>>(productsUrl),
        ]);
        const combinedData = [
          ...(newsResult?.data || []),
          ...(productsResult?.data || []),

        ];
        setData(combinedData);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка загрузки Объектов:", error);
        setLoading(false);
      }
    }, 1000);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputValue, domain]);

  return (
    <div className={styles.search_wrapper}>
      {/* <div className="container"> */}
        <div className={styles.wrapper}>
          <div className={styles.input_area}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onKeyUp={handleKeyUp}
              onBlur={() => setTimeout(() => setIsFocused(false), 1000)} // задержка, чтобы кликнуть по элементу
              className={styles.input}
              placeholder="Поиск"
            />

            {/* <button
              className={styles.delete}
              onClick={handleDelete}
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Удалить</title>
                <path
                  d="M1.81282 0.0450334L15.955 14.1872L14.1872 15.9549L0.0450488 1.8128L1.81282 0.0450334Z"
                  fill="#6B6B6B"
                />
                <path
                  d="M15.955 1.8128L1.81282 15.9549L0.0450482 14.1872L14.1872 0.0450334L15.955 1.8128Z"
                  fill="#6B6B6B"
                />
              </svg>
            </button> */}

            <button
              className={styles.primary_button}
              type="submit"
              onClick={handleSearchSubmit}
            >
              <Image src="/icons/search.svg" alt="search-icon" width={28} height={28} />
            </button>
          </div>

          {isFocused && (
            <ul className={styles.list}>
              {inputValue.trim() === "" && <li>Начните печатать</li>}
              {loading && <p>Загрузка...</p>}
              {!loading &&
                dataList.length === 0 &&
                inputValue.trim() !== "" && <li>Ничего не найдено</li>}

              {!loading && newsList.length > 0 && (
                <li className={styles.item}>
                  <div className={styles.item_image_wrapper}>
                    <p className={styles.item_image_text}>Новости</p>
                    {newsList.map((item, index) => (
                      <div
                        key={`${item.documentId}-${index}`}
                        className={styles.item_image}
                      >
                        <Image
                          src="/icons/search.svg"
                          alt="search-icon"
                          width={22}
                          height={22}
                        />
                        <Link
                          href={`/news/${item.documentId}`}
                          rel="noopener noreferrer"
                          onClick={closeSearch}
                        >
                          <span className={styles.item_title}>
                            {highlightText(item?.title ?? "", inputValue)}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </li>
              )}

              {!loading &&
                productGroups.map(({ category, products }) => {
                  return (
                    <li
                      key={category.documentId ?? category.slug ?? category.name}
                      className={styles.item}
                    >
                      <div className={styles.item_image_wrapper}>
                        <p className={styles.item_image_text}>
                          {category.name ?? "Без категории"}
                        </p>
                        {products.map((item, index) => (
                          <div
                            key={`${item.documentId}-${category.documentId ?? category.slug ?? category.name}-${index}`}
                            className={styles.item_image}
                          >
                            <Image
                              src="/icons/search.svg"
                              alt="search-icon"
                              width={22}
                              height={22}
                            />

                            <Link
                              href={`/products/${item?.slug}`}
                              rel="noopener noreferrer"
                              onClick={closeSearch}
                            >
                              <span className={styles.item_title}>
                                {highlightText(item?.title ?? "", inputValue)}
                              </span>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      {/* </div> */}
    </div>
  );
}
