import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)

def build_pdf():
    pdf_filename = "c:/Users/RAVI BHUVA/Desktop/Piyella/Piyella_Platform_Complete_Guide.pdf"
    
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=40,
        rightMargin=40,
        topMargin=45,
        bottomMargin=45
    )
    
    styles = getSampleStyleSheet()
    
    # Custom Luxury Styles
    primary_color = colors.HexColor('#9C7B3B') # Warm Gold Accent
    dark_bg = colors.HexColor('#1A1A1A')
    light_bg = colors.HexColor('#F8F8F5')
    text_dark = colors.HexColor('#222222')
    text_muted = colors.HexColor('#555555')
    
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=6
    )
    
    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=text_muted,
        spaceAfter=15
    )
    
    h1_style = ParagraphStyle(
        'Heading1Custom',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=dark_bg,
        spaceBefore=14,
        spaceAfter=8
    )
    
    h2_style = ParagraphStyle(
        'Heading2Custom',
        parent=styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=primary_color,
        spaceBefore=10,
        spaceAfter=4
    )
    
    body_style = ParagraphStyle(
        'BodyCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
        spaceAfter=6
    )
    
    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#005580'),
        spaceAfter=4
    )
    
    story = []
    
    # Header Banner
    story.append(Paragraph("PIYELLA ATELIER", ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=10, leading=12, textColor=primary_color, spaceAfter=2)))
    story.append(Paragraph("Complete Platform Operational Guide & Master Step-by-Step Manual", title_style))
    story.append(Paragraph("Handcrafted Luxury Ecommerce Platform for Hand-Embroidered Purses, Wool Thread Embroidery, Cozy Crochet Gifts, Home Décor, and Hair Accessories.", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceBefore=0, spaceAfter=15))
    
    # Section 1: Executive Overview
    story.append(Paragraph("1. Executive Overview & Architecture", h1_style))
    story.append(Paragraph("Piyella is a world-class luxury D2C ecommerce web application built with modern architecture designed for real-time commercial production.", body_style))
    
    tech_data = [
        [Paragraph("<b>Layer</b>", body_style), Paragraph("<b>Technology Stack</b>", body_style), Paragraph("<b>Production Purpose</b>", body_style)],
        [Paragraph("Frontend Framework", body_style), Paragraph("Next.js 16 (Turbopack) & React 19", body_style), Paragraph("Server Component Rendering & Static Page Optimization", body_style)],
        [Paragraph("Styling System", body_style), Paragraph("Tailwind CSS v4 & Vanilla CSS", body_style), Paragraph("Onyx Dark & Warm Cream Light Dual Theme System", body_style)],
        [Paragraph("Database", body_style), Paragraph("Supabase PostgreSQL (Pooler 6543)", body_style), Paragraph("Real-Time Data Sync, Catalog, Orders & User Profiles", body_style)],
        [Paragraph("Authentication", body_style), Paragraph("Clerk Authentication (RBAC)", body_style), Paragraph("Google OAuth, Email OTP & Admin Protection", body_style)],
        [Paragraph("Payment Gateway", body_style), Paragraph("Razorpay Official API", body_style), Paragraph("UPI, Credit Cards, Net Banking & Order Verification", body_style)],
        [Paragraph("Logistics", body_style), Paragraph("Shiprocket API Engine", body_style), Paragraph("Live Shipping Calculator, AWB Tracking & Returns", body_style)],
        [Paragraph("Hosting & CDN", body_style), Paragraph("Vercel Enterprise Platform", body_style), Paragraph("Global Edge Network & Automated CI/CD Deployments", body_style)],
    ]
    
    t_tech = Table(tech_data, colWidths=[130, 180, 220])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), light_bg),
        ('TEXTCOLOR', (0,0), (-1,0), dark_bg),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E5E5E0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 15))
    
    # Section 2: Administrator Access
    story.append(Paragraph("2. Administrator Access & Login Process", h1_style))
    story.append(Paragraph("Follow these exact steps to access the protected Executive Admin Console:", body_style))
    story.append(Paragraph("<b>Step 1:</b> Visit the Admin Portal via website shortcut link in the Footer, header profile dropdown, or directly navigate to: <font color='#9C7B3B'><u>http://localhost:3000/admin</u></font>", body_style))
    story.append(Paragraph("<b>Step 2:</b> If unauthenticated, you will be redirected to the Sign-In page (<font color='#9C7B3B'><u>/sign-in</u></font>).", body_style))
    story.append(Paragraph("<b>Step 3:</b> Sign in using your registered admin email <b>ravibhuva003@gmail.com</b> or click <b>Continue with Google</b>.", body_style))
    story.append(Paragraph("<b>Step 4:</b> Assigning Admin Role in Clerk Dashboard (if adding new admin users):", body_style))
    story.append(Paragraph("1. Open Clerk Dashboard (<i>dashboard.clerk.com</i>) &rarr; Users &rarr; Select User.<br/>2. Edit Public Metadata JSON: <code>{ \"role\": \"admin\" }</code>.<br/>3. Save changes. The account now has full executive permissions across all protected <code>/admin</code> endpoints.", code_style))
    story.append(Spacer(1, 15))
    
    # Section 3: Products Management
    story.append(Paragraph("3. Products & Catalog Management", h1_style))
    story.append(Paragraph("<b>Creating a New Product:</b>", h2_style))
    story.append(Paragraph("1. Navigate to <b>Admin Portal &rarr; Products &rarr; + Add New Product</b> (<font color='#9C7B3B'><u>/admin/products/new</u></font>).", body_style))
    story.append(Paragraph("2. Enter Product Title (e.g., <i>Hand-Embroidered Velvet Purse</i>), Slug, and detailed craft description.", body_style))
    story.append(Paragraph("3. Set Regular Price in INR (₹) and optional Compare-At Price for sale discount tags.", body_style))
    story.append(Paragraph("4. Select Category (e.g., <i>Embroidery Purses</i>, <i>Wool Thread Embroidery</i>, <i>Crochet Gifts</i>, <i>Home Décor</i>, <i>Hair Accessories</i>).", body_style))
    story.append(Paragraph("5. Provide High-Resolution Image URLs or drag-and-drop reference files.", body_style))
    story.append(Paragraph("6. Set In-Stock Inventory Quantity and Product Badges (<i>NEW</i>, <i>SALE</i>, <i>FEATURED</i>).", body_style))
    story.append(Paragraph("7. Click <b>Publish Product</b>. The item instantly syncs live across Homepage Best Sellers, Search, and Category pages.", body_style))
    
    story.append(Paragraph("<b>Editing & Deleting Products:</b>", h2_style))
    story.append(Paragraph("Go to <b>/admin/products</b> to modify stock counts, update prices, or remove items with 1-click confirmation.", body_style))
    story.append(Spacer(1, 15))
    
    # Section 4: Categories & Collections
    story.append(Paragraph("4. Categories & Collections Management", h1_style))
    story.append(Paragraph("<b>Creating Custom Categories:</b>", h2_style))
    story.append(Paragraph("1. Navigate to <b>Admin Portal &rarr; Categories</b> (<font color='#9C7B3B'><u>/admin/categories</u></font>).", body_style))
    story.append(Paragraph("2. Fill out Category Name (e.g., <i>Cozy Crochet Gifts</i>), Slug, and Subtitle description.", body_style))
    story.append(Paragraph("3. Enter a high-definition Cover Image URL.", body_style))
    story.append(Paragraph("4. Click <b>+ Create Category</b>.", body_style))
    story.append(Paragraph("5. Created categories immediately appear in the Homepage <b>Shop by Category</b> showcase and <b>/collections</b> directory.", body_style))
    story.append(Spacer(1, 15))
    
    # Section 5: Order Fulfillment & Logistics
    story.append(Paragraph("5. Order Fulfillment & Shipping Logistics", h1_style))
    story.append(Paragraph("<b>Managing Orders:</b>", h2_style))
    story.append(Paragraph("1. Navigate to <b>Admin Portal &rarr; Orders</b> (<font color='#9C7B3B'><u>/admin/orders</u></font>).", body_style))
    story.append(Paragraph("2. View incoming customer orders, purchaser contact info, total amount (₹), and gift packaging status.", body_style))
    story.append(Paragraph("3. Update status in real-time: <code>Pending</code> &rarr; <code>Processing</code> &rarr; <code>Shipped</code> &rarr; <code>Delivered</code>.", body_style))
    story.append(Paragraph("4. Click <b>Generate Invoice PDF</b> to view printable 24K Gold Foil Invoice (<font color='#9C7B3B'><u>/invoice/[orderId]</u></font>).", body_style))
    story.append(Paragraph("5. Click <b>View Gift Card</b> for custom gift card messages (<font color='#9C7B3B'><u>/gift-card/[orderId]</u></font>).", body_style))
    story.append(Paragraph("6. Real-time customer tracking is available via <b>/tracking/[trackingId]</b> with visual progress timeline.", body_style))
    story.append(Spacer(1, 15))
    
    # Section 6: Bespoke Monogramming & Custom Artwork
    story.append(Paragraph("6. Monogramming & Custom Artwork Quotations", h1_style))
    story.append(Paragraph("<b>PDP Hand-Stitched Monogram Personalizer:</b>", h2_style))
    story.append(Paragraph("Customers can add custom initials and select thread colors directly on Product Detail Pages (PDP).", body_style))
    
    story.append(Paragraph("<b>Custom Artwork & Embroidery Commission Requests:</b>", h2_style))
    story.append(Paragraph("1. Customers submit custom requests at <font color='#9C7B3B'><u>/custom-artwork</u></font> selecting material (e.g. <i>24K Gold Leaf Inlay</i>, <i>Merino Wool Tapestry</i>), frame, canvas size, budget tier, and uploading reference photos.", body_style))
    story.append(Paragraph("2. Administrators review requests at <b>Admin Portal &rarr; Custom Artworks</b> (<font color='#9C7B3B'><u>/admin/custom-artworks</u></font>).", body_style))
    story.append(Paragraph("3. Admin sets Custom Price Quote (₹), estimated crafting days, artisan assignment, and updates status to <i>Quotation Sent</i>.", body_style))
    story.append(Paragraph("4. Customers track their artwork quotation and progress in their account dashboard (<font color='#9C7B3B'><u>/account/custom-artworks</u></font>).", body_style))
    story.append(Spacer(1, 15))
    
    # Section 7: Atelier Cinema & Reels
    story.append(Paragraph("7. Atelier Cinema & Instagram Reels", h1_style))
    story.append(Paragraph("1. Public Instagram Reels gallery available at <font color='#9C7B3B'><u>/reels</u></font> featuring category filters (<i>Making Process</i>, <i>Behind the Scenes</i>, <i>Customer Unboxing</i>).", body_style))
    story.append(Paragraph("2. Clicking any reel opens a full-screen video lightbox player with sound toggle and interactive linked product drawer.", body_style))
    story.append(Paragraph("3. Administrators manage videos at <b>/admin/reels</b> to add video URLs, poster covers, view counts, pin top reels, and link store products.", body_style))
    story.append(Spacer(1, 15))

    # Section 8: Coupons & Banners
    story.append(Paragraph("8. Coupons, Discounts & Banner Announcements", h1_style))
    story.append(Paragraph("<b>Coupons (/admin/coupons):</b> Create promo discount codes (e.g. <i>PIYELLA20</i>), discount %, and minimum spend limits.", body_style))
    story.append(Paragraph("<b>Storefront Banners (/admin/banners):</b> Update hero headlines, subtitles, and active announcement bar text.", body_style))
    story.append(Spacer(1, 15))
    
    # Section 9: Theme Toggle System
    story.append(Paragraph("9. Dark & Light Mode Theme System", h1_style))
    story.append(Paragraph("Piyella includes a dual theme design system with smooth 1-click toggling:", body_style))
    story.append(Paragraph("• <b>Onyx Dark Mode:</b> Deep <code>#0A0A0A</code> background with gold <code>#D4B87C</code> highlights.<br/>• <b>Warm Cream Light Mode:</b> Soft <code>#FAFAF8</code> background with rich serif typography.<br/>• Users toggle theme using the Sun/Moon button in the top header navbar.", body_style))
    story.append(Spacer(1, 15))

    # Section 10: Vercel Production Deployment
    story.append(Paragraph("10. Vercel Production Deployment Guide", h1_style))
    story.append(Paragraph("Follow these 3 simple steps to deploy your GitHub codebase live on Vercel:", body_style))
    
    deploy_table = [
        [Paragraph("<b>Step</b>", body_style), Paragraph("<b>Action</b>", body_style), Paragraph("<b>Details</b>", body_style)],
        [Paragraph("Step 1", body_style), Paragraph("Import Repository", body_style), Paragraph("Go to <i>vercel.com/new</i> &rarr; Import <b>ravibhuva003/Piyella</b>", body_style)],
        [Paragraph("Step 2", body_style), Paragraph("Set Environment Keys", body_style), Paragraph("Add <code>DATABASE_URL</code>, <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>, <code>CLERK_SECRET_KEY</code>, <code>NEXT_PUBLIC_RAZORPAY_KEY_ID</code>, <code>RAZORPAY_KEY_SECRET</code>, <code>SHIPROCKET_EMAIL</code>", body_style)],
        [Paragraph("Step 3", body_style), Paragraph("Click Deploy", body_style), Paragraph("Vercel builds 39 static & dynamic pages and generates your live domain (e.g. <b>https://piyella.vercel.app</b>)", body_style)],
    ]
    
    t_deploy = Table(deploy_table, colWidths=[60, 150, 320])
    t_deploy.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), light_bg),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor('#E5E5E0')),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('TOPPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_deploy)
    story.append(Spacer(1, 20))
    
    # Sign Off
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=10, spaceAfter=10))
    story.append(Paragraph("<b>Piyella Luxury Atelier</b> &bull; Built for High-Performance Commercial Ecommerce &bull; Repository: <i>https://github.com/ravibhuva003/Piyella.git</i>", ParagraphStyle('FooterText', fontName='Helvetica', fontSize=8, leading=10, textColor=text_muted, alignment=1)))

    doc.build(story)
    print("PDF generated successfully:", pdf_filename)

if __name__ == '__main__':
    build_pdf()
