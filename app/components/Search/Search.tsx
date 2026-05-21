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

// import fetchData from "../../utils/fetchData";

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
  // сюда дописывать другие поля из API
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

  // console.log("dataList", dataList);

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
    setSearchOpened?.(false);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Редирект
      router.push(`/search?query=${encodeURIComponent(inputValue.trim())}`);
      setSearchOpened?.(false);
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
        // const newsUrl = `${domain}/api/novostis?filters[title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
        // const doctorsUrl = `${domain}/api/vrachis?filters[name][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
        // const uslugaUrl = `${domain}/api/shablon-uslugis?filters[hero_title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
        // const podUslugaUrl = `${domain}/api/shablon-pod-uslugas?filters[hero_title][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;
        // const specializationUrl = `${domain}/api/vrachis?filters[specialization][$containsi]=${encodeURIComponent(inputValue)}&populate=*`;

        // const [
        //   newsResult,
        //   doctorsResult,
        //   uslugaResult,
        //   podUslugaResult,
        //   specializationResult,
        // ] = await Promise.all([
        //   fetchData<ApiListResponse<ResponseItem>>(newsUrl),
        //   fetchData<ApiListResponse<ResponseItem>>(doctorsUrl),
        //   fetchData<ApiListResponse<ResponseItem>>(uslugaUrl),
        //   fetchData<ApiListResponse<ResponseItem>>(podUslugaUrl),
        //   fetchData<ApiListResponse<ResponseItem>>(specializationUrl),
        // ]);
        // const combinedData = [
        //   ...(newsResult?.data || []),
        //   ...(doctorsResult?.data || []),
        //   ...(uslugaResult?.data || []),
        //   ...(podUslugaResult?.data || []),
        //   ...(specializationResult?.data || []),
        // ];
        // setData(combinedData);
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
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.input_area}>
            <input
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

              {!loading &&
                dataList.map((item, index) => {
                  return (
                    <li
                      key={`${item.documentId}-${index}`}
                      className={styles.item}
                    >
                      {item.type === "news" && (
                        <div className={styles.item_image_wrapper}>
                          <p className={styles.item_image_text}>Новости</p>
                          <div className={styles.item_image}>
                            <Image
                              src="/icons/search-icon.svg"
                              alt="search-icon"
                              width={22}
                              height={22}
                            />
                            <Link
                              href={`/news/${item.documentId}`}
                              rel="noopener noreferrer"
                              onClick={() => setSearchOpened?.(false)}
                            >
                              <span className={styles.item_title}>
                                {highlightText(item?.title ?? "", inputValue)}
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {item.type === "doctors" && (
                        <div className={styles.item_image_wrapper}>
                          <p className={styles.item_image_text}>Врачи</p>
                          <div className={styles.item_image}>
                            <Image
                              src="/icons/search-icon.svg"
                              alt="search-icon"
                              width={22}
                              height={22}
                            />

                            <Link
                              href={`/doctors/${item?.slug}`}
                              rel="noopener noreferrer"
                              onClick={() => setSearchOpened?.(false)}
                            >
                              <span className={styles.item_title}>
                                {highlightText(item?.name ?? "", inputValue)}
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {item.type === "usluga" && (
                        <div className={styles.item_image_wrapper}>
                          <p className={styles.item_image_text}>Услуги</p>
                          <div className={styles.item_image}>
                            <Image
                              src="/icons/search-icon.svg"
                              alt="search-icon"
                              width={22}
                              height={22}
                            />

                            <Link
                              href={`/services/${item?.slug}`}
                              rel="noopener noreferrer"
                              onClick={() => setSearchOpened?.(false)}
                            >
                              <span className={styles.item_title}>
                                {highlightText(
                                  item?.hero_title ?? "",
                                  inputValue,
                                )}
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}

                      {item.type === "pod-usluga" && (
                        <div className={styles.item_image_wrapper}>
                          <p className={styles.item_image_text}>Услуги</p>
                          <div className={styles.item_image}>
                            <Image
                              src="/icons/search-icon.svg"
                              alt="search-icon"
                              width={22}
                              height={22}
                            />

                            <Link
                              href={`/services/service/${item?.slug}`}
                              rel="noopener noreferrer"
                              onClick={() => setSearchOpened?.(false)}
                            >
                              <span className={styles.item_title}>
                                {highlightText(
                                  item?.hero_title ?? "",
                                  inputValue,
                                )}
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
