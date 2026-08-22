const i18n = {
  lang: 'en',
  dictionary: {
    en: {
      app_title: "🎨🎵 Art & Music Community",
      nav_home: "🏠 Home",
      nav_art: "🎨 Art Studio",
      nav_music: "🎵 Music Studio",
      nav_relax: "🧘 Relax",
      nav_kids: "👶 Kids Zone",
      nav_learn: "📚 Courses",
      nav_gallery: "💾 Gallery",
      nav_admin: "👨‍💼 Admin",
      daily_quote: '"Every child is an artist. The problem is how to remain an artist once we grow up." – Pablo Picasso',
      btn_draw: "Draw Now",
      btn_play: "Play Music",
      btn_relax: "Relax",
      btn_kids: "Kids Zone",
      cont_learn: "Continue Learning",
      daily_chal: "Daily Challenge"
    },
    te: {
      app_title: "🎨🎵 కళ & సంగీత సముదాయం",
      nav_home: "🏠 హోమ్",
      nav_art: "🎨 ఆర్ట్ స్టూడియో",
      nav_music: "🎵 మ్యూజిక్ స్టూడియో",
      nav_relax: "🧘 విశ్రాంతి",
      nav_kids: "👶 పిల్లల విభాగం",
      nav_learn: "📚 కోర్సులు",
      nav_gallery: "💾 గ్యాలరీ",
      nav_admin: "👨‍💼 అడ్మిన్",
      daily_quote: '"ప్రతి శిశువు ఒక కళాకారుడు. పెరిగిన తర్వాత కళను కాపాడుకోవడమే ముఖ్యం."',
      btn_draw: "చిత్రం వేయండి",
      btn_play: "సంగీతం వాయించండి",
      btn_relax: "విశ్రాంతి తీసుకోండి",
      btn_kids: "పిల్లల ఆటలు",
      cont_learn: "నేర్చుకోవడం కొనసాగించండి",
      daily_chal: "నేటి సవాలు"
    },
    hi: {
      app_title: "🎨🎵 कला और संगीत समुदाय",
      nav_home: "🏠 होम",
      nav_art: "🎨 कला स्टूडियो",
      nav_music: "🎵 संगीत स्टूडियो",
      nav_relax: "🧘 विश्राम",
      nav_kids: "👶 किड्स ज़ोन",
      nav_learn: "📚 पाठ्यक्रम",
      nav_gallery: "💾 गैलरी",
      nav_admin: "👨‍💼 व्यवस्थापक",
      daily_quote: '"हर बच्चा एक कलाकार है। सवाल यह है कि बड़े होने पर इसे कैसे बनाए रखा जाए।"',
      btn_draw: "चित्र बनाएं",
      btn_play: "संगीत बजाएं",
      btn_relax: "विश्राम करें",
      btn_kids: "किड्स ज़ोन",
      cont_learn: "सीखना जारी रखें",
      daily_chal: "दैनिक चुनौती"
    }
  },
  setLanguage(l) {
    this.lang = l;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (this.dictionary[l][key]) el.textContent = this.dictionary[l][key];
    });
  }
};