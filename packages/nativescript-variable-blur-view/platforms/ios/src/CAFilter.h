/**
 * https://github.com/nst/iOS-Runtime-Headers/blob/fbb634c78269b0169efdead80955ba64eaaa2f21/Frameworks/QuartzCore.framework/CAFilter.h#L5
*/

@interface CAFilter : NSObject <NSCopying, NSMutableCopying, NSSecureCoding> {
    void * _attr;
    void * _cache;
    unsigned int  _flags;
    NSString * _name;
    unsigned int  _type;
}

@property (getter=isAccessibility) bool accessibility;
@property bool cachesInputImage;
@property (getter=isEnabled) bool enabled;
@property (copy) NSString *name;
@property (getter=px_isSnapshotCompatible, nonatomic, readonly) bool px_snapshotCompatible;
@property (nonatomic, readonly) bool px_supportsAlphaBlending;
@property (readonly) NSString *type;

// Image: /System/Library/Frameworks/QuartzCore.framework/QuartzCore

+ (void)CAMLParserStartElement:(id)arg1;
+ (bool)automaticallyNotifiesObserversForKey:(id)arg1;
+ (id)filterTypes;
+ (id)filterWithName:(id)arg1;
+ (id)filterWithType:(id)arg1;
+ (bool)supportsSecureCoding;

- (void)CAMLParser:(id)arg1 setValue:(id)arg2 forKey:(id)arg3;
- (id)CAMLTypeForKey:(id)arg1;
- (struct Object { int (**x1)(); struct Atomic { struct { int x_1_2_1; } x_2_1_1; } x2; }*)CA_copyRenderValue;
- (bool)cachesInputImage;
- (id)copyWithZone:(struct _NSZone { }*)arg1;
- (void)dealloc;
- (id)description;
- (bool)enabled;
- (void)encodeWithCAMLWriter:(id)arg1;
- (void)encodeWithCoder:(id)arg1;
- (id)initWithCoder:(id)arg1;
- (id)initWithName:(id)arg1;
- (id)initWithType:(id)arg1;
- (bool)isAccessibility;
- (bool)isEnabled;
- (id)mutableCopyWithZone:(struct _NSZone { }*)arg1;
- (id)name;
- (void)setAccessibility:(bool)arg1;
- (void)setCachesInputImage:(bool)arg1;
- (void)setDefaults;
- (void)setEnabled:(bool)arg1;
- (void)setName:(id)arg1;
- (void)setValue:(id)arg1 forKey:(id)arg2;
- (id)type;
- (id)valueForKey:(id)arg1;

// Image: /System/Library/PrivateFrameworks/PhotosUICore.framework/PhotosUICore

+ (id)px_filterWithPXCompositingFilterType:(long long)arg1;

- (bool)px_isSnapshotCompatible;
- (bool)px_supportsAlphaBlending;

@end