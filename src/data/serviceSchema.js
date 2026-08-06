// src/data/serviceSchemas.js
const BUSINESS_ID = 'https://www.lfseffects.com/#business'
const BASE = 'https://www.lfseffects.com/services'

export const serviceSchemas = {
  hair: {
    serviceType: 'Hair Salon Services',
    name: 'Hair Services',
    url: `${BASE}/hair`,
    description:
      'Haircuts & styling, hair colouring, highlights & balayage, extensions, braids & weaves, keratin treatments, perms & relaxers, deep conditioning, and wash & blow-dry.',
    items: [
      'Haircuts & Styling',
      'Hair Colouring',
      'Highlights & Balayage',
      'Hair Extensions',
      'Braids & Weaves',
      'Keratin Treatments',
      'Perms & Relaxers',
      'Hair Uninstalling',
      'Deep Conditioning Treatments',
      'Washing & Blow-drying',
    ],
  },

  lashBrow: {
    serviceType: 'Lash & Brow Services',
    name: 'Lash & Brow Services',
    url: `${BASE}/lash-brow`,
    description: 'Eyelash extensions, brow shaping, brow tinting, lash lifts & tints, and microblading.',
    items: ['Eyelash Extensions', 'Brow Shaping', 'Brow Tinting', 'Lash Lifts & Tints', 'Microblading'],
  },

  nails: {
    serviceType: 'Nail Salon Services',
    name: 'Nail Services',
    url: `${BASE}/nails`,
    description: 'Manicures, pedicures, nail art, nail enhancements, hand & foot massage, and nail repair & restoration.',
    items: ['Manicures', 'Pedicures', 'Nail Art', 'Nail Enhancements', 'Hand & Foot Massage', 'Nail Repair & Restoration'],
  },

  faceTherapies: {
    serviceType: 'Facial & Skincare Services',
    name: 'Face Therapies',
    url: `${BASE}/face-therapies`,
    description:
      'Facial treatments, spa facials, microdermabrasion, dermaplaning, chemical peels, skin analysis & consultation, and massage therapy.',
    items: [
      'Facial Treatments',
      'Spa Facials',
      'Microdermabrasion',
      'Dermaplaning',
      'Chemical Peels',
      'Skin Analysis & Consultation',
      'Massage Therapy',
      'Cleansing Treatments',
    ],
  },

  makeup: {
    serviceType: 'Makeup Services',
    name: 'Makeup Services',
    url: `${BASE}/makeup`,
    description: 'Bridal makeup, glam & photo-ready makeup, airbrush makeup, beauty makeup, and makeup consultations.',
    items: ['Bridal Makeup', 'Glam & Photo-ready Makeup', 'Airbrush Makeup', 'Beauty Makeup', 'Makeup Consultations'],
  },

  bridal: {
    serviceType: 'Bridal Beauty Services',
    name: 'Bridal Services',
    url: `${BASE}/bridal`,
    description: 'Full wedding-day package: bridal makeup & hair, fascinator design & styling, bridal gele styling, and bridal trial sessions.',
    items: ['Bridal Makeup & Hair', 'Bridal Fascinator Design & Styling', 'Bridal Gele Styling', 'Bridal Trial Sessions'],
  },

  fascinators: {
    serviceType: 'Fascinator & Headpiece Services',
    name: 'Fascinator & Accessory Services',
    url: `${BASE}/fascinators`,
    description:
      'Custom fascinator design, fascinator styling & placement, headpiece repairs & restoration, and event fascinators for weddings, graduations, and formal events.',
    items: ['Custom Fascinator Design', 'Fascinator Styling & Placement', 'Headpiece Repairs & Restoration', 'Event Fascinators'],
  },

  gele: {
    serviceType: 'Traditional Gele Headwrap Styling',
    name: 'Gele (African Headwrap) Services',
    url: `${BASE}/gele`,
    description:
      'Traditional gele wrapping, bridal gele design, event gele styling, gele for bridal parties, custom gele selection, gele maintenance & storage guidance, and gele workshops.',
    items: [
      'Traditional Gele Wrapping',
      'Bridal Gele Design',
      'Event Gele Styling',
      'Gele for Bridal Parties',
      'Custom Gele Selection',
      'Gele Maintenance & Storage',
      'Gele Workshops',
    ],
  },

  bodyWellness: {
    serviceType: 'Body & Wellness Services',
    name: 'Body & Wellness Services',
    url: `${BASE}/body-wellness`,
    description: 'Waxing, threading, spray tanning, body massage, body treatments, and stone therapy massage.',
    items: ['Waxing', 'Threading', 'Spray Tanning', 'Body Massage', 'Body Treatments', 'Stone Therapy Massage'],
  },
}

export const BUSINESS_ID_URL = BUSINESS_ID