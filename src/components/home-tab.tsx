import OffersCard from "./offers-card";
import PortfolioSummaryCard from "./portfolio-summary-card";

export default function HomeTab() {
  return (
    <div className="p-4 space-y-6">
      <PortfolioSummaryCard />
      <OffersCard />
    </div>
  );
}
