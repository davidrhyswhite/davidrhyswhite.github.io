module Jekyll
  module WordCount
    def count_words(input)
      input.split(' ').size
    end

    def word_count_to_human(input)
      seconds = count_words(input) / 5

      return case seconds
      when 1..44
        "less than a minute"
      when 45..59
        "about 1 minute"
      else
        number_of_minutes = seconds / 60
        plural = (number_of_minutes < 2) ? "" : "s"
        "about #{number_of_minutes} minute#{plural}"
      end
    end
  end
end

Liquid::Template.register_filter Jekyll::WordCount