export const mockEvidenceData = {
  imageUrl: '/assets/mock-product.jpg', // ensure this image exists in public/assets or use placeholder URL
  findings: [
    {
      id: 'f1',
      label: 'Missing ingredient list',
      description: 'The ingredient list is not visible in the captured image.',
      bounds: { x: 120, y: 80, width: 200, height: 60 },
    },
    {
      id: 'f2',
      label: 'Incorrect net weight',
      description: 'The net weight displayed does not match the declared weight.',
      bounds: { x: 350, y: 200, width: 150, height: 50 },
    },
  ],
};
