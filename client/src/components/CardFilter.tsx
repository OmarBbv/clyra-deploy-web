import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ICardFilterProps {
    filter: string[]
    setSelectFilter: React.Dispatch<React.SetStateAction<string>>
    selectFilter: string
}

export function CardFilter(cardFilterValues: ICardFilterProps) {
    const { filter, setSelectFilter, selectFilter } = cardFilterValues;

    const handleSelectFilterItem = (item: string) => {
        if (item === "all")
            setSelectFilter("");
        else setSelectFilter(item);
    }

    return (
        <Select value={selectFilter} onValueChange={handleSelectFilterItem}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtreleme" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {!selectFilter ? <SelectLabel>Hepsi</SelectLabel> : <SelectItem className="capitalize font-medium" value='all'>Hepsi</SelectItem>}

                    {
                        filter?.map((item, index) => {
                            return <SelectItem key={index} className="capitalize" value={item}>{item}</SelectItem>
                        })
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
