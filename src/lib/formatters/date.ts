export const relativeDate = {
  format: (date: Date) => {
    const getRelativeTimeFormatter = (locale = "en") => {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

      const DIVISIONS: { amount: number; name: Intl.RelativeTimeFormatUnit }[] =
        [
          { amount: 60, name: "seconds" },
          { amount: 60, name: "minutes" },
          { amount: 24, name: "hours" },
          { amount: 7, name: "days" },
          { amount: 4.34524, name: "weeks" },
          { amount: 12, name: "months" },
          { amount: Number.POSITIVE_INFINITY, name: "years" },
        ];

      return (date: Date) => {
        const now = new Date();
        let duration = (date.getTime() - now.getTime()) / 1000;

        for (let i = 0; i <= DIVISIONS.length; i++) {
          const division = DIVISIONS[i];
          if (Math.abs(duration) < division.amount) {
            return rtf.format(Math.round(duration), division.name);
          }
          duration /= division.amount;
        }
      };
    };

    return getRelativeTimeFormatter("en")(date);
  },
};
