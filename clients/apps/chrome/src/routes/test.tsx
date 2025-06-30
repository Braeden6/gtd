import Overlay from '@/components/Overlay';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
    component: Test,
})

function Test() {
    return (
        <>
        <div className='w-1/2 h-full text-center'>
        List of countries and dependencies by population

Article
Talk
Read
View source
View history

Tools
Appearance hide
Text

Small

Standard

Large
Width

Standard

Wide
Color (beta)

Automatic

Light

Dark
Page semi-protected
From Wikipedia, the free encyclopedia
This article is about a list of countries and dependencies by population based on figures from official sources or, if not available, estimates and projections from the United Nations. For a list based purely on figures from the United Nations, see List of countries and dependencies by population (United Nations).
This article reflects continually changing information from hundreds of sources. You can help by updating items to more recent figures from official sources.

Cartogram of the world's population in 2018; each square represents 500,000 people.
This is a list of countries and dependencies by population. It includes sovereign states, inhabited dependent territories and, in some cases, constituent countries of sovereign states, with inclusion within the list being primarily based on the ISO standard ISO 3166-1. For instance, the United Kingdom is considered a single entity, while the constituent countries of the Kingdom of the Netherlands are considered separately. In addition, this list includes certain states with limited recognition not found in ISO 3166-1. Also given in a percentage is each country's population compared with the world population, which the United Nations estimated at 8.232 billion as of 2025.[1]

Method
See also: List of countries and dependencies by population density and List of regional organizations by population
Figures used in this chart are based on the most up-to-date estimates or projections by the national census authority, where available, and are usually rounded off.

Where updated national data are not available, figures are based on the estimates or projections for 2024 by the Population Division of the United Nations Department of Economic and Social Affairs.

Because the compiled figures are not collected at the same time in every country, or at the same level of accuracy, the resulting numerical comparisons may create misleading conclusions. Furthermore, the addition of figures from all countries may not equal the world total.

Areas that form integral parts of sovereign states, such as the countries of the United Kingdom, are counted as part of the sovereign states concerned. Not included are other entities that are not sovereign states, such as the European Union,[a] and independent territories that do not have permanent populations, such as the Chagos Archipelago and various countries' claims to Antarctica.[2]

Sovereign states and dependencies by population
Note: A numbered rank is assigned to the 193 member states of the United Nations, plus the two observer states to the United Nations General Assembly. Dependent territories and constituent countries that are parts of sovereign states are not assigned a numbered rank. In addition, sovereign states with limited recognition are included, but not assigned a number rank.
        </div>
        <Overlay/>
        </>
    )
}

export default Test;