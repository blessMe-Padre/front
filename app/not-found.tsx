import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
    return (
        <section className="flex min-h-[clamp(500px,70vh,760px)] overflow-hidden bg-[linear-gradient(135deg,#f5f6fa_0%,#fff_55%,#eef0f7_100%)] max-[560px]:min-h-[620px]">
            <div className="container grid w-full grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] items-center gap-[clamp(40px,7vw,120px)] py-[70px] max-[900px]:grid-cols-1 max-[560px]:py-12">
                <div className="relative z-2 max-w-[680px]">
                    <p className="mb-[-0.12em] font-[family-name:var(--second-family)] text-[clamp(6.5rem,9.5vw,11.875rem)] leading-[0.9] font-bold tracking-[-0.08em] text-[var(--light-blue)]" aria-hidden="true">
                        404
                    </p>
                    <p className="mb-3.5 text-sm leading-[1.3] font-semibold tracking-[0.14em] text-[var(--blue)] uppercase">
                        Страница не найдена
                    </p>
                    <h1 className="mb-5 max-w-[620px] font-[family-name:var(--second-family)] text-[clamp(1.875rem,2.5vw,3rem)] leading-[1.12] font-semibold text-[var(--black)]">
                        Кажется, такой страницы больше нет
                    </h1>
                    <p className="max-w-[570px] text-lg leading-[1.55] text-[#555a6c] max-[560px]:text-base">
                        Возможно, ссылка устарела или адрес был введён с ошибкой. Вернитесь на главную
                        страницу или перейдите в каталог.
                    </p>
                    <div className="mt-[34px] flex items-center gap-6 max-[560px]:flex-col max-[560px]:items-stretch max-[560px]:gap-2.5">
                        <Link href="/" className="button_primary min-w-40">
                            На главную
                        </Link>
                        <Link href="/catalog" className="px-0 py-2.5 text-lg font-semibold text-[var(--blue)] underline decoration-1 underline-offset-8 transition-opacity hover:opacity-70 max-[560px]:text-center">
                            Перейти в каталог
                        </Link>
                    </div>
                </div>

                <div className="relative aspect-square w-[min(34vw,470px)] justify-self-center max-[900px]:hidden" aria-hidden="true">
                    <Image
                        src="/logo-big.png"
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 900px) 0px, 470px"
                        className="object-contain"
                    />
                </div>
            </div>
        </section>
    );
}
