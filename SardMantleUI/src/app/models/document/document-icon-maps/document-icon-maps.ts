export class DocumentIconMaps {
    public iconMap = new Map<string | null, string>([
        [null, "question_mark"],
        ["int", "looks_one"],
        ["dub", "percent"],
        ["str", "format_quote"],
        ["sum", "summarize"],
        ["doc", "description"],
        ["img", "image"],
        ["dat", "dataset"],
        ["bit", "check_box"],
        ["uni", "design_services"],
        ["tim", "schedule"]
    ])
    public nameMap = new Map<string | null, string>([
        [null, "Unknown"],
        ["int", "Number"],
        ["dub", "Decimal Number"],
        ["str", "String"],
        ["sum", "Summary"],
        ["doc", "Article"],
        ["img", "Image"],
        ["dat", "Document"],
        ["bit", "Checkbox"],
        ["uni", "Unit"],
        ["tim", "Date/Time"]
    ])
}
