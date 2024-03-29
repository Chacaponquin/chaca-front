import { Discord, GitHub, Twitter } from "@modules/app/modules/icon/components"
import { LinkButton } from "../interfaces"
import { useMemo } from "react"
import { CHACA_LINKS } from "@containers/LandigPage/constants/Links"

export default function useLinks() {
  const LINKS: Array<LinkButton> = useMemo(() => {
    return [
      { title: "Github", icon: GitHub, link: CHACA_LINKS.GITHUB },
      { title: "Twitter", icon: Twitter, link: CHACA_LINKS.TWITTER },
      { title: "Discord", icon: Discord, link: CHACA_LINKS.DISCORD },
    ]
  }, [])

  return { LINKS }
}
