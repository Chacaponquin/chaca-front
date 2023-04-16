import { APP_IMAGES } from "@modules/shared/constant"
import { useLanguage } from "@modules/shared/modules/appConfig/hooks"

const NoFieldsToRef = () => {
  const UI_TEXT = useLanguage({
    NO_FIELDS_TEXT: { en: "No hay campos para referenciar", es: "No hay campos para referenciar" },
  })

  return (
    <div className='flex flex-col w-full justify-center items-center mt-4'>
      <img
        src={APP_IMAGES.EMPTY.image}
        alt={APP_IMAGES.EMPTY.alt}
        className='w-[450px] esm:w-[350px] exsm:w-[300px]'
      />
      <p className='mb-0 mt-2 text-2xl font-fontBold text-slate-500'>{UI_TEXT.NO_FIELDS_TEXT}</p>
    </div>
  )
}

export default NoFieldsToRef
