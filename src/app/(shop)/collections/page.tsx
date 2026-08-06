import { getServerProducts, getServerCollections } from '@/lib/server-data';
import { AllCollectionsView } from '@/components/shop/all-collections-view';

export default async function CollectionsPage() {
  const products = getServerProducts();
  const collections = getServerCollections();

  return (
    <AllCollectionsView
      initialProducts={products}
      initialCollections={collections}
    />
  );
}
