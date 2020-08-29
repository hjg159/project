<?php
header('content-type:text/html;charset="utf-8"');
 $list = array(        
            "product_id"=>"10000151",
            "name"=> "Redmi K20 Pro ",
            "title"=> "Redmi K20",
            "product_desc_ext"=> "「8GB+256GB，直降300元，到手仅2699元，可享花呗6期免息，每期低至450元」骁龙855旗舰处理器 / 索尼4800万超广角三摄 / 前置2000万升降式相机 / 6.39\"AMOLED全面屏 / 4000mAh超长续航 / 8层石墨立体散热 / 第七代屏下指纹解锁 / 多功能NFC",
            "price_max"=> "2699",
            "market_price_max"=> "2999",
            "price_min"=> "2699",
            "market_price_min"=> "2999",
            "value"=> "8GB+256GB",
            "images"=> "//i8.mifile.cn/a1/pms_1558857678.14769305.jpg"  
 );

    echo json_encode($list);

?>