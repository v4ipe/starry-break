# الحقوق والتراخيص والمصادر (Credits & Open Source Licensing)

## Starry Break
- **Project Rebrand & UI/UX Design**: نصرو بن عياد (Nasro Ben Ayad)
- **Base Project**: [Afterglow Web](https://github.com/well0nez/afterglow-web) by well0nez & m0zz.

---

## 1. شجرة الأنساب التقنية والمساهمون (Technical Lineage & Contributors)

مشروع **Starry Break** مبني على جهود وبحوث نخبة من مهندسي ومطوري مجتمع أمن الأنظمة وبرمجيات المصدر المفتوح:

| المطور / الباحث (Contributor) | المكون / الدور (Role & Component) | نوع الرخصة (License) |
|---|---|---|
| **نصرو بن عياد (Nasro Ben Ayad)** | تصميم وتطوير واجهة Starry Break، الهوية البصرية (Cyber-Anime Monochrome)، والتعريب الكامل. | AGPLv3 / MIT |
| **well0nez / m0zz** | مؤلفو مشروع Afterglow الأصلي ومحول استغلال النواة عبر الويب. | GNU AGPLv3 |
| **raw13g** | مطور ملفات الاستضافة وهيكلية التشغيل: `jb.js`، `ps4_offsets.js`، وإعداد البيئة. | MIT License |
| **aminegold0 (silverps4hen)** | إعادة بناء وتطوير بيئة المضيف المستقلة واستقرار الاستدعاءات. | Open Source |
| **jordyidk (slopkit)** | الأساس البرمجي البدائي لمعالجة الذاكرة: `core.js`، `mem.js`، `int64.js` (المقتبس من كسر PS5 والمكيف لـ PS4). | Slopkit Lineage |
| **SiSTRo** | مطور بيئة وحمولة **GoldHEN** لتمكين التطبيقات المنزلية وتصحيح النظام. | Proprietary / Community Free |
| **al-azif, Pharaoh2k, TheFlow, ChendoChap, abc, LightningMods, @egycnq** | أبحاث الثغرات الأمنية، اكتشاف سلاسل استغلال النواة (Kernel Exploit Lineage)، وترقيعات الذاكرة. | Security Research |

---

## 2. بيان التراخيص القانونية (Open Source Licenses)

يتألف هذا المشروع من عدة طبقات برمجية تخضع للشروط القانونية التالية:

### أ) ترخيص GNU Affero General Public License v3 (AGPLv3)
- يغطي كود نواة الاستغلال `afterglow.js` ومجموعات الترقيع الثنائية `patchset-1400.bin` و `patchset-1352.bin`.
- يضمن هذا الترخيص بقاء أي تعديلات أو استضافات شبكية حرة ومفتوحة المصدر للمجتمع وفق بنود AGPLv3.
- نص الترخيص الكامل متوفر في ملف `LICENSE`.

### ب) ترخيص MIT License (كود raw13g)
- يغطي ملفات الواجهة الأساسية وهيكلية المضيف المكتوبة بواسطة `raw13g`:
  - `jb.js`
  - `ps4_offsets.js`
  - صفحة الاستدعاء ومسودات التشغيل.
- نص الترخيص الكامل متوفر في ملف `LICENSE-raw13g`.

### ج) مكونات Slopkit Primitive
- ملفات `core.js`، `mem.js`، و `int64.js` مشتقة ومطورة عن مشروع [slopkit](https://github.com/jordyidk/slopkit) للمطور `jordyidk`.
- يحتفظ الكود بثوابت وتواقيع `slopkit` الأصلية دون المساس بها حفاظاً على النزاهة العلمية والتقنية.

---

## 3. إخلاء المسؤولية القانونية والأمنية (Security & Legal Notice)

1. **لا يوجد كود محمي لسوني (No Sony Proprietary Code)**:
   لا يحتوي هذا المستودع على أي ملفات ثنائية أو شفرات مصدرية مسربة أو محمية بحقوق ملكية تجارية لشركة Sony Interactive Entertainment Inc. الحمولات الثنائية المضمنة (مثل GoldHEN و HEN) هي برمجيات مجتمعية حرة ومخصصة لتشغيل التطبيقات المنزلية (Homebrew).
   
2. **أبحاث الأمن على العتاد المملوك فقط (Security Research on Owned Hardware)**:
   هذا المشروع موجه للباحثين والمهندسين وأصحاب الأجهزة لأغراض التعليم والبحث الأمني على أجهزتهم المملوكة شخصياً. لا نتحمل أي مسؤولية عن أي سوء استخدام يخالف القوانين المحلية أو الدولية.
